import { stripe } from "../config/stripe.js";
import Product from "../model/Product.js";
import Cart from "../model/Cart.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    if (!cartItems?.length) {
      return res.status(400).json({
        success: false,
        message: "Cart is Empty",
      });
    }
    const productIds = cartItems.map((i) => i.productId);
    const productsFromDB = await Product.find({
      _id: { $in: productIds },
    });

    const lineItems = cartItems.map((cartItem) => {
      const product = productsFromDB.find(
        (p) => p._id.toString() === cartItem.productId,
      );
      if (!product) {
        throw new Error(`Product not found: ${cartItem.productId}`);
      }
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.image?.length
              ? [`${process.env.CLIENT_URL}${product.image[0]}`]
              : [],
          },
          unit_amount: Math.round(product.newPrice * 100),
        },
        quantity: cartItem.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      metadata: {
        userId: req.user.id,
        // userId: "test-user-123",
      },
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const stripeWebhook = async (req, res) => {
  console.log("WEBHOOK HIT");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    console.log("EVENT TYPE:", event.type);
  } catch (error) {
    console.log("SIGNATURE ERROR:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "payment_intent.succeeded"
    ) {
      const session = event.data.object;

      console.log("SESSION DATA:", session);

      const userId = session.metadata?.userId;

      console.log("USER ID:", userId);

      if (!userId) {
        console.log("No userId found in metadata");
        return res.status(200).json({ received: true });
      }

      await Cart.findOneAndUpdate({ user: userId }, { items: [] });

      console.log("Cart cleared for user:", userId);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ success: false });
  }
};

import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { FaTrash } from "react-icons/fa";

const CartItems = () => {
  const {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);

  return (
    <div className="cart-items">
      <div className="cart-items-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {products.map((item) => {
        if (cartItems[item.id] > 0) {
          return (
            <div className="cart-items-format" key={item.id}>
              <img src={item.image} alt="" className="cart-item-product-img" />

              <p>{item.name}</p>
              <p>${item.new_price}</p>

              <div className="quantity-box">
                <button
                  className="qty-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  –
                </button>

                <span className="qty-number">{cartItems[item.id]}</span>

                <button className="qty-btn" onClick={() => addToCart(item.id)}>
                  +
                </button>
              </div>

              <p>${item.new_price * cartItems[item.id]}</p>

              <FaTrash
                onClick={() => removeFromCart(item.id)}
                size={20}
                className="remove-icon"
              />
            </div>
          );
        }
        return null;
      })}
      <div className="cart-items-down">
        <div className="cart-items-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cart-items-total-items">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-items-total-items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-items-total-items">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Proceed to checkout</button>
        </div>
        <div className="cart-items-promo-code">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-items-promo-box">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

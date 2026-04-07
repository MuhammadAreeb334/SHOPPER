import React, { createContext, useState, useEffect } from "react";
import { FireAPI, baseUrl } from "../hooks/useRequest";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await FireAPI(`api/products`, "GET");
      console.log("Fetched products:", data.allProducts);

      if (data && data.success) {
        const productsData = data.allProducts
        const formattedProducts = productsData.map((product) => ({
          id: product._id, 
          name: product.name,
          image: `${baseUrl}${product.image?.[0] || ""}`,
          new_price: product.newPrice,
          old_price: product.oldPrice,
          category: product.category,
          available: product.available,
          images: product.image || [],
        }));

        setProducts(formattedProducts);

        const initialCart = {};
        formattedProducts.forEach((product) => {
          initialCart[product.id] = 0;
        });
        setCartItems(initialCart);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 0) {
        newCart[itemId] = newCart[itemId] - 1;
      }
      return newCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = products.find(
          (product) => product.id === itemId
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalCartItems = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        totalCartItems += cartItems[itemId];
      }
    }
    return totalCartItems;
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    loading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
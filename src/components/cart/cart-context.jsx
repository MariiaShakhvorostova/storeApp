import React, { createContext, useContext, useState, useEffect } from "react";
import apiService from "../../api/api-service";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiService
      .fetchProducts()
      .then((products) => setProducts(products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, products }}>
      {children}
    </CartContext.Provider>
  );
};

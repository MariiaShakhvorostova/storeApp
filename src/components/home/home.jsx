import React, { useState } from "react";
import Header from "../header/header";
import "./home.css";
import { useCart } from "../cart/cart-context";

const Home = () => {
  const { addToCart, products } = useCart();

  const [addedToCartMap, setAddedToCartMap] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCartMap((prevState) => ({
      ...prevState,
      [product.id]: true,
    }));
    setCartItemCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <Header cartItemCount={cartItemCount} />

      <ul className="main">
        {products.length > 0 &&
          products.map((product) => (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div className="product-title">{product.title}</div>
              <div className="product-price">${product.price}</div>{" "}
              <div className="green-button">
                <div className="icon-button">
                  <img
                    src={
                      addedToCartMap[product.id]
                        ? "/src/assets/img/added-bird.png"
                        : "/src/assets/img/Icon-plus.png"
                    }
                  />
                </div>
                <button
                  className="product-button"
                  onClick={() => handleAddToCart(product)}
                >
                  {addedToCartMap[product.id] ? "Added" : "Add to Cart"}{" "}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;

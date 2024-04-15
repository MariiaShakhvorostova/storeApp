import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Navigation from "../navigation/nav";
import { useCart } from "./cart-context";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const { cart } = useCart();

  useEffect(() => {
    setCartItems(cart.map((item) => ({ ...item, quantity: 1 })));
  }, [cart]);

  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const deleteItem = (index) => {
    const updatedCartItems = [...cartItems];
    const deletedItem = updatedCartItems.splice(index, 1)[0];
    setCartItems(updatedCartItems);
  };

  return (
    <div className="cart-container">
      <Header />

      <ul className="main">
        <Navigation />

        <h1>Cart</h1>

        {cartItems.map((item, index) => (
          <li key={item.id} className="cart-item">
            <div className="cart-content">
              <div className="image-container">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="info-container">
                <div className="title">{item.title}</div>
                <div className="quantity-container">
                  <button
                    className={`minus-cart ${
                      item.quantity === 1 ? "single-quantity" : ""
                    }`}
                    onClick={() => decreaseQuantity(index)}
                  ></button>
                  <span>{item.quantity}</span>
                  <button
                    className="plus-cart"
                    onClick={() => increaseQuantity(index)}
                  ></button>
                </div>
              </div>
              <div className="delete-price">
                <div className="delete-container">
                  <div className="trash-icon"></div>
                  <button onClick={() => deleteItem(index)}>Delete</button>
                </div>
                <div className="cart-item-price">
                  Price: ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          </li>
        ))}
        <div className="together-next">
          <p className="together">
            Together: <span>{calculateTotalQuantity()} products.</span>
          </p>
          <p className="sum">
            Sum: <span>${calculateTotalPrice()}</span>
          </p>
          <div className="button-next">
            <Link
              className="next-path"
              to="/checkout/contact"
              state={{
                cartItems: cartItems.map((item) => ({
                  id: item.id,
                  thumbnail: item.thumbnail,
                  title: item.title,
                  price: item.price,
                  quantity: item.quantity,
                })),
              }}
            >
              Next step
            </Link>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Cart;

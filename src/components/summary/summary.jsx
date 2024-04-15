import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
import { useCart } from "../cart/cart-context";
import "./summary.css";

const OrderSummary = () => {
  const { cart } = useCart();

  const location = useLocation();
  const { shipmentInfo, contactInfo, cartItems } = location.state || {};

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const generateOrderNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return randomNumber.toString().padStart(3, "0");
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    if (cartItems) {
      cartItems.forEach((item) => {
        subtotal += item.price * item.quantity;
      });
    }
    return subtotal.toFixed(2);
  };

  return (
    <div>
      <Header isOrderSummaryPage={true} />

      <div className="main cont">
        <div className="thanks">
          <div className="icon-sum"></div>
          <h2 className="order">Thank you for your order!</h2>
          <p className="p-conf">
            The order confirmation email with details of your order and a link
            to track its progress has been sent to your email address.
          </p>
          <h3 className="your-ord">
            Your order # {generateOrderNumber()} is - PENDING
          </h3>
          <p className="order-date">Order Date: {formatDate(Date.now())}</p>
        </div>

        <div className="cont-ship">
          <div className="contacts">
            <div className="p-icon">
              <div className="icon-pers"></div>
              <p className="inf-cont">Contact information</p>
            </div>
            {contactInfo && (
              <>
                <div className="cont-int">
                  <p className="names">
                    {contactInfo.firstName} {contactInfo.lastName}
                  </p>
                  <p className="names">{contactInfo.email}</p>
                  <p className="names">{contactInfo.phone}</p>
                </div>
              </>
            )}
          </div>

          <div className="shipments">
            <div className="p-icon">
              <div className="icon-bus"></div>
              <p className="inf-cont">Contact information</p>
            </div>
            {shipmentInfo && (
              <>
                <div className="cont-int">
                  <p className="names">
                    {shipmentInfo.address} {shipmentInfo.city}
                  </p>
                  <p className="names">
                    {shipmentInfo.state} {shipmentInfo.zip}
                  </p>
                  <p className="names">{shipmentInfo.country}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="order-cart">
          <div className="p-icon">
            <div className="icon-i"></div>
            <p className="inf-cont">Order summary</p>
          </div>
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.id} className="parent-of">
                <div className="order-item">
                  <img
                    className="summar-img"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className="price-tit-quan">
                    <p className="names">{item.title}</p>
                    <p className="price-quan">
                      ${item.price * item.quantity}, {item.quantity}{" "}
                      {item.quantity > 1 ? "products" : "product"}
                    </p>
                  </div>
                </div>
                <div className="grey-line"></div>
              </div>
            ))}

          <div className="order-total">
            <div className="subtotal">
              <p className="names">Subtotal: ${calculateSubtotal()}</p>
            </div>
            <div className="shipping-handling">
              <p className="names">Shipping & Handling: $0.00</p>
            </div>
            <div className="tax">
              <p className="names">Tax: $0.00</p>
            </div>
            <div className="grand-total">
              <p>Grand Total: ${calculateSubtotal()}</p>
            </div>
          </div>
        </div>
        <div className="button-next add">Continue shopping</div>
      </div>
    </div>
  );
};

export default OrderSummary;

import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ cartItemCount, isOrderSummaryPage }) => {
  return (
    <div className="header">
      <div className="logo"></div>{" "}
      <div className="button-one">
        {isOrderSummaryPage ? null : (
          <div className="button-cart ">
            <div className="icon"></div>
            <Link className="cart-path" to="/cart">
              Cart
            </Link>
          </div>
        )}
        {cartItemCount > 0 && (
          <div className="yellow-circle">
            <span>{cartItemCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

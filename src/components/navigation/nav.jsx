import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./nav.css";

const Navigation = ({ contactInfo }) => {
  const location = useLocation();

  return (
    <div className="navigation">
      <NavLink
        to="/cart"
        className={location.pathname === "/cart" ? "active" : ""}
      >
        Cart
      </NavLink>
      <span> </span>
      <NavLink
        to="/checkout/contact"
        className={location.pathname === "/checkout/contact" ? "active" : ""}
      >
        Contact information
      </NavLink>
      <span> </span>
      <NavLink
        to="/checkout/shipment"
        className={`${
          location.pathname === "/checkout/shipment" || !contactInfo
            ? "disabled"
            : ""
        }`}
        style={{ pointerEvents: !contactInfo ? "none" : "auto" }}
      >
        Shipment information
      </NavLink>
    </div>
  );
};

export default Navigation;

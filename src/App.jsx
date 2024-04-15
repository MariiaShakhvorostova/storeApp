import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/home";
import Cart from "./components/cart/cart";
import ContactInformation from "./components/contact-inf/contact";
import ShipmentInformation from "./components/shipment-inf/shipment";
import OrderSummary from "./components/summary/summary";
import { CartProvider } from "./components/cart/cart-context";

const App = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [shipmentInfo, setShipmentInfo] = useState(null);

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout/contact"
              element={
                <ContactInformation
                  onSubmit={(values) => setContactInfo(values)}
                />
              }
            />
            <Route
              path="/checkout/shipment"
              element={
                <ShipmentInformation
                  onSubmit={(values) => setShipmentInfo(values)}
                />
              }
            />
            <Route
              path="/order-summary"
              element={
                <OrderSummary
                  shipmentInfo={shipmentInfo}
                  contactInfo={contactInfo}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;

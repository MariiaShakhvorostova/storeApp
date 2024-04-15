import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useLocation } from "react-router-dom";

import Header from "../header/header";
import Navigation from "../navigation/nav";
import "./shipment.css";

const ShipmentInformation = ({ onSubmit }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [formValid, setFormValid] = useState(false);

  const location = useLocation();
  const { contactInfo: storedContactInfo, cartItems } = location.state || {};
  const [formTouched, setFormTouched] = useState(false);

  const formik = useFormik({
    initialValues: {
      address: "",
      apartment: "",
      city: "",
      country: "",
      state: "",
      zip: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      console.log(values);
    },
  });

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedRegion("");
    formik.setFieldValue("country", value);
    formik.setFieldValue("state", "");
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    formik.setFieldValue("state", value);
  };

  useEffect(() => {
    setFormValid(formik.isValid && formik.dirty);
  }, [formik.isValid, formik.dirty]);

  useEffect(() => {
    const isFormTouched = Object.keys(formik.touched).some(
      (key) => formik.touched[key]
    );
    setFormTouched(isFormTouched);
  }, [formik.touched]);

  return (
    <div>
      <Header />
      <div className="main cont">
        <Navigation />

        <form onSubmit={formik.handleSubmit}>
          <h2>Shipment Information</h2>
          <div className="shipment-container">
            <div className="shipment-column">
              <div className="containers">
                <label htmlFor="address">Address (No P. O. Boxes)*</label>
                <input
                  className="inputs"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  {...formik.getFieldProps("address")}
                />
                <div
                  className={`contact-line ${
                    formik.touched.address && formik.errors.address
                      ? "error"
                      : ""
                  }`}
                ></div>
                {formik.touched.address && formik.errors.address && (
                  <div className="error-message error">
                    {formik.errors.address}
                  </div>
                )}
              </div>
              <div className="containers">
                <label htmlFor="apartment">
                  Apartment, suite etc. (optional)
                </label>
                <input
                  className="inputs"
                  id="apartment"
                  name="apartment"
                  type="text"
                  placeholder="Enter your apartment information"
                  {...formik.getFieldProps("apartment")}
                />
                <div className="contact-line"></div>
              </div>
              <div className="containers">
                <label htmlFor="city">City*</label>
                <input
                  className="inputs"
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  {...formik.getFieldProps("city")}
                />
                <div
                  className={`contact-line ${
                    formik.touched.city && formik.errors.city ? "error" : ""
                  }`}
                ></div>
                {formik.touched.city && formik.errors.city && (
                  <div className="error-message error">
                    {formik.errors.city}
                  </div>
                )}
              </div>
            </div>
            <div className="shipment-row">
              <div className="containers zip">
                <label htmlFor="country">Country/Region*</label>
                <CountryDropdown
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  showDefaultOption={true}
                  defaultOptionLabel="Select your country/region"
                  className="inputs"
                  onBlur={() => formik.setFieldTouched("country", true)}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="error-message error">
                    {formik.errors.country}
                  </div>
                )}
                <div className="contact-line"></div>
              </div>
              <div className="containers zip">
                <label htmlFor="state">State*</label>
                <RegionDropdown
                  id="state"
                  name="state"
                  country={formik.values.country}
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  blankOptionLabel="Select your state"
                  classes="inputs"
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="error-message error">
                    {formik.errors.state}
                  </div>
                )}
                <div className="contact-line"></div>
              </div>
              <div className="containers zip heigh">
                <label htmlFor="zip">ZIP code*</label>
                <input
                  className="inputs"
                  id="zip"
                  name="zip"
                  type="text"
                  placeholder="Enter your ZIP code"
                  {...formik.getFieldProps("zip")}
                />
                <div
                  className={`contact-line zip ${
                    formik.touched.zip && formik.errors.zip ? "error" : ""
                  }`}
                ></div>
                {formik.touched.zip && formik.errors.zip && (
                  <div className="error-message error">{formik.errors.zip}</div>
                )}
              </div>
            </div>
          </div>
          <div className="button-next">
            <Link
              className={`next-path ${
                formTouched && formik.isValid ? "" : "disabled"
              }`}
              to={formTouched && formik.isValid ? "/order-summary" : ""}
              state={{
                shipmentInfo: formik.values,
                contactInfo: storedContactInfo,
                cartItems: cartItems,
              }}
            >
              Submit order
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentInformation;

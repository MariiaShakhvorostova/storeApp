import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./contact.css";
import Header from "../header/header";
import Navigation from "../navigation/nav";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ContactInformation = ({ onSubmit }) => {
  const [formValid, setFormValid] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required field"),
      lastName: Yup.string().required("Required field"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required field"),
      phone: Yup.string().required("Required field"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const location = useLocation();
  const { cartItems } = location.state || {};

  useEffect(() => {
    setFormValid(formik.isValid && formik.dirty);
  }, [formik.isValid, formik.dirty]);

  return (
    <div>
      <Header />
      <div className="main cont">
        <Navigation />

        <form onSubmit={formik.handleSubmit}>
          <h2>Contact Information</h2>
          <div className="contact-container">
            <div className="div raws">
              <div className="containers">
                <label htmlFor="firstName">First Name*</label>
                <input
                  required
                  className="inputs"
                  placeholder="Enter your first name"
                  id="firstName"
                  name="firstName"
                  type="text"
                  {...formik.getFieldProps("firstName")}
                />
                <div
                  className={`contact-line ${
                    (formik.touched.firstName && formik.errors.firstName) ||
                    (formik.touched.firstName && formik.values.firstName === "")
                      ? "error"
                      : ""
                  }`}
                ></div>

                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="error-message error">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div className="containers">
                <label htmlFor="email">Email*</label>
                <input
                  placeholder="Enter your email"
                  className="inputs"
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                <div
                  className={`contact-line ${
                    (formik.touched.email && formik.errors.email) ||
                    (formik.touched.email && formik.values.email === "")
                      ? "error"
                      : ""
                  }`}
                ></div>

                {formik.touched.email && formik.errors.email ? (
                  <div className="error-message error">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="div raws">
              <div className="containers">
                <label htmlFor="lastName">Last Name*</label>
                <input
                  className="inputs"
                  placeholder="Enter your last name"
                  id="lastName"
                  name="lastName"
                  type="text"
                  {...formik.getFieldProps("lastName")}
                />
                <div
                  className={`contact-line ${
                    (formik.touched.lastName && formik.errors.lastName) ||
                    (formik.touched.lastName && formik.values.lastName === "")
                      ? "error"
                      : ""
                  }`}
                ></div>

                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="error-message error">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>

              <div className="containers">
                <label htmlFor="phone">Phone*</label>
                <input
                  placeholder="Enter your phone"
                  className="inputs"
                  id="phone"
                  name="phone"
                  type="text"
                  {...formik.getFieldProps("phone")}
                />
                <div
                  className={`contact-line ${
                    (formik.touched.phone && formik.errors.phone) ||
                    (formik.touched.phone && formik.values.phone === "")
                      ? "error"
                      : ""
                  }`}
                ></div>

                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error-message error">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="button-next">
            <Link
              className={`next-path ${!formValid ? "disabled" : ""}`}
              to={formValid ? "/checkout/shipment" : ""}
              state={{
                contactInfo: formik.values,
                cartItems: cartItems,
              }}
            >
              Next step
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactInformation;

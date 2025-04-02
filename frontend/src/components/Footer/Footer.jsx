import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} TopStyle. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/account">My Account</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

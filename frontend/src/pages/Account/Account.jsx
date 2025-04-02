import React from "react";
import { useSelector } from "react-redux";
import "./Account.css";

const Account = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="account-page">
      <h2>My Account</h2>

      {user ? (
        <div className="account-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}

      {/* Optional form fields could go here if we add profile editing later */}
    </div>
  );
};

export default Account;

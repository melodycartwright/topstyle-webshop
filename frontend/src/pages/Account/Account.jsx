import React, { useState } from "react";
import { useSelector } from "react-redux";
import accountService from "../../features/account/accountService";
import { toast } from "react-toastify";
import "./Account.css";

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await accountService.updateProfile({ name, email, password }, user.token);
      toast.success("✅ Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed.");
    }
  };

  return (
    <div className="account-page">
      <h2>My Account</h2>
      <form onSubmit={handleUpdate} className="account-form">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>New Password</label>
        <input
          type="password"
          placeholder="Leave blank to keep current"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Account;

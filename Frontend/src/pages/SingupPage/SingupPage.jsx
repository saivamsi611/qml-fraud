import React from "react";
import { Link } from "react-router-dom";
import './SingupPage.css';
import Globe from "../../components/Globe"; // 🌍 background globe

export default function SignupPage() {
  return (
    <div className="wrapper">
      <Globe />
      <div className="console-panel">
        <h2>Sign up here</h2>
        <form>
          <label>Username</label>
          <input type="text" placeholder="username " required />

          <label>Email</label>
          <input type="email" placeholder="email " required />

          <label>Password</label>
          <input type="password" placeholder="Authorization key" required />

          <div className="button-group">
            <button type="submit">Launch</button>
            <button type="reset">Reset</button>
          </div>
        </form>

        <p className="form-link">
          Already registered? <Link to="/login">Login to deck</Link>
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import './ForgotPassword.css'; // You can reuse the SignupPage.css or create separate styles

export default function ForgotPasswordPage() {
  return (
    <div className="wrapper">
      <div className="console-panel">
        <h2>Forgot Password</h2>
        <form>
          <label htmlFor="email">Enter your email</label>
          <input type="email" id="email" placeholder="Email address" required />

          <div className="button-group">
            <button type="submit">Reset Password</button>
          </div>
        </form>

        <p className="form-link">
          Remember your password? <Link to="/login">Login to deck</Link>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css"; 
import Globe from "../../components/Globe"; 
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      if (response.data.success) {
        setMessage("✅ Password reset link sent to your email.");
      } else {
        setError("⚠️ Something went wrong, please try again.");
      }
    } catch (err) {
      setError("❌ Failed to send reset link. Check your email or try later.");
    }
  };

  return (
    <div className="wrapper">
      <Globe />
      <div className="console-panel">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="button-group">
            <button type="submit">Submit</button>
          </div>
        </form>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}

        <p className="form-link">
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

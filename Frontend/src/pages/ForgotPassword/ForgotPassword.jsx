import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import Globe from "../../components/Globe";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://127.0.0.1:8080/forget_password", {
        email: email.trim(),
      });

      // Adjust to match your Flask backend's structure
      if (response.data.status === "success") {
        setMessage("✅ Password reset link sent to your email.");
      } else {
        setError("⚠️ " + (response.data.message || "Something went wrong, please try again."));
      }
    } catch (err) {
      console.error("Forgot password error:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError("❌ " + err.response.data.message);
      } else {
        setError("❌ Failed to send reset link. Check your email or try again later.");
      }
    } finally {
      setIsSubmitting(false);
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
            autoComplete="email"
          />

          <div className="button-group">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>

        {message && (
          <p className="success-msg" aria-live="polite">
            {message}
          </p>
        )}
        {error && (
          <p className="error-msg" aria-live="assertive">
            {error}
          </p>
        )}

        <p className="form-link">
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

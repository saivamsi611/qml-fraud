import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import axios from "axios";
import Globe from "../../components/Globe";
import LinearLoader from "../../components/LinearLoader";
import "./LoginPage.css";

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setFormLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setFormLoading(false);

      if (response.data.success) {
        console.log("Login success:", response.data);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        setSuccessMsg("Login successful! Redirecting...");
        setTimeout(() => navigate("/main"), 1500);
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      setFormLoading(false);
      console.error("Login error:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <LinearLoader isLoading={isLoading || formLoading} />

      {!isLoading && (
        <div className="login-wrapper">
          <Globe />
          <div ref={cardRef} className="login-card">
            <h2>Login</h2>
            <form id="LoginFormContainer" onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={formLoading}
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={formLoading}
              />

              <button type="submit" disabled={formLoading}>
                {formLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {error && <p className="error-text">{error}</p>}
            {successMsg && <p className="success-text">{successMsg}</p>}

            <div className="login-link">
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </div>
            <div className="login-link">
              <Link to="/ForgotPassword">Forgot Password?</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

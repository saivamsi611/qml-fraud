import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import Globe from "../../components/Globe";
import LinearLoader from "../../components/LinearLoader"; 
import "./LoginPage.css";

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Show loader for ~1.2s every time page opens
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        console.log("Login success:", response.data);

        // store token if backend provides
        localStorage.setItem("token", response.data.token);

        // redirect after login
        navigate("/home");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Loader always shows first */}
      <LinearLoader isLoading={isLoading} />

      {!isLoading && (
        <div className="login-wrapper">
          <Globe />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="login-card"
          >
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Log In</button>
            </form>

            {error && <p className="error-text">{error}</p>}

            <div className="login-link">
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </div>
            <div className="login-link">
              <Link to="/ForgotPassword">Forgot Password?</Link>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

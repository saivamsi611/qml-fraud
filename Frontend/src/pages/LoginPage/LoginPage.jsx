import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Globe from "../../components/Globe"; // 🌍 background globe
import './LoginPage.css';

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login submitted');
  };

  return (
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
          <input type="email" placeholder="Your email" required />

          <label>Password</label>
          <input type="password" placeholder="Your password" required />

          <button type="submit">Log In</button>
        </form>

        <div className="login-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
        <div className="login-link">
        <Link to="/ForgotPassword">Forgot Password?</Link>
        </div>
    
      </motion.div>
    </div>
  );
}

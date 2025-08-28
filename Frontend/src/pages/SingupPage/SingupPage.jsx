import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SingupPage.css";
import Globe from "../../components/Globe";

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8080/signup", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setLoading(false);

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error("Signup failed:", error);
      alert("Error during signup. Try again.");
    }
  };

  return (
    <div className="wrapper">
      <Globe />
      <div className="console-panel">
        <h2>Sign up here</h2>
        <form id="SignUpForm" onSubmit={handleSubmit} onReset={handleReset}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password-icon"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <label>Confirm Password</label>
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Retype Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password-icon"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button type="reset" disabled={loading}>
              Reset
            </button>
          </div>
        </form>

        <p className="form-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
        <p className="forget-password">
          Forgot password? <Link to="/ForgotPassword">Reset here</Link>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // ✅ Import axios
import "./SingupPage.css";
import Globe from "../../components/Globe"; // 🌍 background globe

export default function SignupPage() {
  // ✅ State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData); 
      // 🔹 Change URL to your backend endpoint
      alert(response.data.message || "Signup successful!");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed, try again.");
    }
  };

  return (
    <div className="wrapper">
      <Globe />
      <div className="console-panel">
        <h2>Sign up here</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="username "
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email "
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Authorization key"
            value={formData.password}
            onChange={handleChange}
            required
          />

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

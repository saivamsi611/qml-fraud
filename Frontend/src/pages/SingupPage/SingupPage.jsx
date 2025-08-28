import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SingupPage.css";
import Globe from "../../components/Globe"; // 🌍 background globe

export default function SignupPage() {
  console.log("SignUpPage")
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted")

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    const response = await axios.post(
      "https://backend-production-5e92.up.railway.app/signup",
      formDataToSend,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Backend" , response.data);

    if (response.status === 200 || response.status === 201) {
      alert("Signup successful! Please login.");
      setTimeout(() => navigate("/login"),100);
    }
  } catch (error) {
    console.error("Signup failed:", error);
    alert("Error during signup. Try again.");
  }
};

  return (
    <div className="wrapper">
      <Globe />
      <div className="console-panel">
        <h2>Sign up here</h2>
        <form id="SignUpForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

         

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Retype Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="retype password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="button-group">
            <button type="submit" onClick={() => console.log("button clicked")}>Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>

        <p className="form-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

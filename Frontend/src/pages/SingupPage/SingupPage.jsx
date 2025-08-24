import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SingupPage.css";
import Globe from "../../components/Globe"; // 🌍 background globe

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State to hold input values
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

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send data to backend
      const response = await axios.post("http://localhost:5000/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        alert("Signup successful! Please login.");
        navigate("/login"); // Redirect to login page
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
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
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

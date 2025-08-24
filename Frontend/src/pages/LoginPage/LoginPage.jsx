import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Globe from "../../components/Globe"; // your globe component
import "./LoginPage.css";
import axios from "axios";

export default function Login() {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  // Animate card on mount
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  // State for inputs
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/login", credentials);

      if (response.status === 200) {
        alert("Login successful!");
        setLoading(false);

        // If backend sends token, store it
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
        }

        navigate("/dashboard"); // redirect
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <Globe />

      {/* White overlay while loading */}
      {loading && <div className="loading-overlay">Loading...</div>}

      <div ref={cardRef} className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={credentials.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="login-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
        <div className="login-link">
          <Link to="/ForgotPassword">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

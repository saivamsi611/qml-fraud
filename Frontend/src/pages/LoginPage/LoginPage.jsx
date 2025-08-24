import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Globe from "../../components/Globe";
import "./LoginPage.css";

export default function Login() {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <div className="login-wrapper">
      <Globe />
      <div ref={cardRef} className="login-card">
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
      </div>
    </div>
  );
}

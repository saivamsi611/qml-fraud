import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); 
  };

  return (
    <header className="site-header">
      <div className="logo">💳 QML Fraud Detection</div>
      <nav>
        <button className="login-btn" onClick={handleLogin}>
          Login
          </button>
          <button className="main-page" onClick={() => navigate("/main")}>
Main Page
        </button>
      </nav>
    </header>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Globe from "../../components/Globe";
import "./about.css";

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <div className="about-container">
      <div className="globe-bg">
        <Globe />
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <ul className="menu-top">
          <li><Link to="/main">Home</Link></li>
          <li><Link to="/main/dashboard">Dashboard</Link></li>
          <li><Link to="/main/reports">Reports</Link></li>
          <li><Link to="/main/analytics">Analytics</Link></li>
          <li><Link to="/main/settings">Settings</Link></li>
          <li><Link to="/main/help">Help</Link></li>
        </ul>
        <ul className="menu-bottom">
          <li><Link to="/main/about">About Us</Link></li>
          <li><Link to="/main/logout">Logout</Link></li>
        </ul>
      </aside>

      <div className={`main-content ${open ? "sidebar-open" : ""}`}>
        <header className="header">
          <button className="hamburger" onClick={() => setOpen(!open)}>
            <Menu size={24} />
          </button>
          <h1>About Us</h1>
        </header>

        <section className="hero">
          <h2 className="hero-title">We protect every transaction with intelligence.</h2>
          <p className="hero-subtitle">
            QML Fraud Detective blends quantum-inspired machine learning with scalable data pipelines to stop fraud in real time.
          </p>
        </section>

        <section className="mission" id="mission">
          <h2>Our Mission</h2>
          <p>Build trustworthy defenses that safeguard digital economies without sacrificing user experience.</p>
          <div className="values-grid">
            <div className="value-card">🔐 Security-first</div>
            <div className="value-card">🌍 Global Reach</div>
            <div className="value-card">👥 Customer-first</div>
            <div className="value-card">🏅 Excellence</div>
            <div className="value-card">🤝 Integrity</div>
            <div className="value-card">🛡️ Trust</div>
          </div>
        </section>

        <section className="story" id="story">
          <h2>Our Story</h2>
          <ul>
            <li><strong>2022</strong> — Concept & research</li>
            <li><strong>2023</strong> — Alpha launch</li>
            <li><strong>2024</strong> — Public release</li>
            <li><strong>2025</strong> — Global expansion</li>
          </ul>
        </section>

        <section className="team" id="team">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            <div className="team-card"><div className="avatar">AR</div><h3>A. Rao</h3><p>Team Lead</p></div>
            <div className="team-card"><div className="avatar">MC</div><h3>M. Chen</h3><p>Engineer</p></div>
            <div className="team-card"><div className="avatar">SK</div><h3>S. Kapoor</h3><p>Product Head</p></div>
          </div>
        </section>

        <section className="contact" id="contact">
          <h2>Contact Us</h2>
          <p>Email: hello@qmlfrauddetective.dev</p>
          <p>Phone: +1 (555) 010-1010</p>
          <p>HQ: Remote-first · Global</p>
        </section>

        <footer className="footer">© {new Date().getFullYear()} QML Fraud Detective</footer>
      </div>
    </div>
  );
}

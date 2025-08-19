import React, { useState } from "react";
import "./MainPage.css";
import Globe from "../../components/Globe";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app">
      {/* Top bar with hamburger */}
      <header className="topbar">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <h1>Fraud Detection Using QML Dashboard</h1>
        <div id="profilecontainer">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile"
            className="profile-image"
          />
          <span className="profile-name">John Doe</span>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="menu-top">
          <ul>
            <li>Home</li>
            <li>Dashboard</li>
            <hr />
            <li>Reports</li>
            <li>Analytics</li>
            <hr />
            <li>Settings</li>
            <li>Help</li>
            <hr />
          </ul>
        </div>
        <div className="menu-bottom">
          <hr/>
          <ul>
            <li>About Us</li>
            <li>Logout</li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="content">
        <Globe/>
        <div className="welcome-message">
          <h2>Welcome to the Fraud Detection Dashboard</h2>
          <p>Explore the latest insights and analytics.</p>
        </div>
      </main>
      
    </div>
  );
}

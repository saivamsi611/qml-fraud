import React, { useState } from "react";
import "./MainPage.css";
import Globe from "../../components/Globe";
import DonutChart from "../../components/ModelErrorDonutChart/MEDonutChart";
import MPMarquee from "../../components/MPMarquee/MPMarquee";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MainPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`app ${open ? "shrink" : ""}`}>
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
            <li>
              <Link to="/main">Home</Link>
            </li>
            <li>
              <Link to="/main/dashboard">Dashboard</Link>
            </li>
            <hr />
            <li>
              <Link to="/main/reportsAndAnalytics">Reports & Analytics</Link>
            </li>
            <hr />
            <li>
              <Link to="/main/settings">Settings</Link>
            </li>
            <li>
              <Link to="/main/help">Help</Link>
            </li>
            <hr />
          </ul>
        </div>
        <div className="menu-bottom">
          <hr />
          <ul>
            <li>
              <Link to="/About">About Us</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="content">
        <Globe />

        {/* Status section */}
        <div className="flex-container">
          <div className="outer-box">
            <div className="inner-box">Status</div>
            <div className="inner-box">Box 1B</div>
          </div>
          <div className="outer-box" style={{ borderLeft: "2px solid black" }}>
            <div className="inner-box">Version</div>
            <div className="inner-box">v0.3</div>
          </div>
          <div className="outer-box" style={{ borderLeft: "2px solid black" }}>
            <div className="inner-box">Uptime</div>
            <div className="inner-box">100%</div>
          </div>
        </div>

        {/* Donut chart */}
        <aside className="right-space">
          <DonutChart accuracy={85} />
        </aside>

        {/* Marquee */}
        <MPMarquee
          className="marquee"
          width="600px"
          items={[
            "🚀 Fraud Detection Dashboard Ready",
            "🔍 Analyzing Quantum ML Data",
            "📊 Report Generated Successfully",
            "⚡ Model Accuracy: 85%",
          ]}
        />

        {/* Bottom Section */}
        <div className="bottom-section">
          {/* Project Directory */}
          <div className="ProjectDirectory">
            <h2>Project Directory</h2>
            <hr />
            <ul>
              <li>None</li>
            </ul>
            <FaPlusCircle className="add-icon" />
          </div>

          {/* Upload Section */}
          <div className="upload-container">
            {/* Link to FormPage */}
            <Link to="/main/form">
              <button className="upload-btn">Upload a new CSV File</button>
            </Link>

            <div className="project-box">
              <button className="project-btn">Go To Project Section</button>
              <div className="empty-box"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

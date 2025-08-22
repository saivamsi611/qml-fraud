import React, { useState } from "react";
import "./MainPage.css";
import Globe from "../../components/Globe";
import DonutChart from "../../components/ModelErrorDonutChart/MEDonutChart";
import MPMarquee from "../../components/MPMarquee/MPMarquee";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function App() {
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
              <li><Link to="/main">Home</Link></li>
              <li><Link to="/main/dashboard">Dashboard</Link></li>
            <hr />
              <li><Link to="/main/ReportsAndAnalyticsPage">Reports & Analytics</Link></li>
            <hr />
              <li><Link to="/main/settings">Settings</Link></li>
              <li><Link to="/main/help">Help</Link></li>
            <hr />
        </ul>

        </div>
        <div className="menu-bottom">
          <hr />
          <ul>
            <li>About Us</li>
            <li>Logout</li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="content">
        <Globe />

        <div class="flex-container">
          <div class="outer-box">
            <div class="inner-box">Status</div>
            <div class="inner-box">Box 1B</div>
          </div>
          <div class="outer-box"  style={{ borderLeft: "2px solid black" }}>
            <div class="inner-box">Version</div>
            <div class="inner-box">v0.3</div>
          </div>
          <div class="outer-box" style={{ borderLeft: "2px solid black" }}>
            <div class="inner-box">uptime</div>
            <div class="inner-box">100%</div>
          </div>
        </div>
        <aside className="right-space">
          <DonutChart accuracy={85} />
         </aside>



         <MPMarquee className="marquee"
        width="600px"   // you can also try "600px" or "100%"
        items={[
          "🚀 Fraud Detection Dashboard Ready",
          "🔍 Analyzing Quantum ML Data",
          "📊 Report Generated Successfully",
          "⚡ Model Accuracy: 85%"
        ]}
      />
      <div className="bottom-section">
          <div className="ProjectDirectory">
            <h2>Project Directory</h2>
            <hr />
            <ul>
              <li>None</li>
            </ul>
            <FaPlusCircle className="add-icon" />
          </div>

          <div className="upload-container">
            <button className="upload-btn">Upload a new CSV File</button>
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

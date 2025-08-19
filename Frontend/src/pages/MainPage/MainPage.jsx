import React, { useState } from "react";
import "./MainPage.css";
import Globe from "../../components/Globe";
import DonutChart from "../../components/ModelErrorDonutChart/MEDonutChart";
import { FaPlusCircle } from "react-icons/fa";

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
            <div class="inner-box">Box 1A</div>
            <div class="inner-box">Box 1B</div>
          </div>
          <div class="outer-box"  style={{ borderLeft: "2px solid black" }}>
            <div class="inner-box">Box 2A</div>
            <div class="inner-box">Box 2B</div>
          </div>
          <div class="outer-box" style={{ borderLeft: "2px solid black" }}>
            <div class="inner-box">Box 3A</div>
            <div class="inner-box">Box 3B</div>
          </div>
        </div>
        <aside className="right-space">
          <DonutChart accuracy={85} className="donut"/>
         </aside>
         <div className="ProjectDirectory">
          <h2>Project Directory</h2>
          <hr/>
          <ul>
            <li>None</li>
          </ul>
          <button>
            <FaPlusCircle className="add-icon" />
          </button>
         </div>
      </main>
    </div>
  );
}

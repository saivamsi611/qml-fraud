import React, { useState, useEffect } from "react";
import "./MainPage.css";
import Globe from "../../components/Globe";
import DonutChart from "../../components/ModelErrorDonutChart/MEDonutChart";
import MPMarquee from "../../components/MPMarquee/MPMarquee";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";   // ✅ axios for backend calls

export default function MainPage() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);        // 🔹 projects from server
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const items = [
    "Welcome to the Fraud Detection Dashboard! ",
    "Upload your transaction data to get started. ",
    "Monitor real-time fraud detection metrics. ",
    "Generate detailed reports and analytics. ",
    "Customize your dashboard settings. ",
    "Need help? Visit our support center. ",
    "Stay secure with our advanced fraud detection algorithms. "
  ];

  // 🔹 Fetch project list from backend API
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get("http://localhost:5000/api/projects"); // ✅ backend call
        setProjects(res.data);   // expect backend returns [{id, name}, ...]
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);

  // 🔹 Handle project selection
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    navigate(`/main/reportsAndAnalytics/${project.id}`); // redirect to analytics
  };

  return (
    <div className={`app ${open ? "shrink" : ""}`}>
      {/* Top bar with hamburger */}
      <header className="topbar">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <h1>Fraud Detection Using QML Dashboard</h1>
        <div id="profilecontainer">
          <span className="profile-name">John Doe</span>
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="menu-top">
          <ul>
            <li><Link to="/main">Home</Link></li>
            <li><Link to="/main/dashboard">Dashboard</Link></li>
            <hr />
            <li><Link to="/main/reportsAndAnalytics">Reports & Analytics</Link></li>
            <hr />
            <li><Link to="/main/settings">Settings</Link></li>
            <li><Link to="/main/help">Help</Link></li>
            <hr />
          </ul>
        </div>
        <div className="menu-bottom">
          <hr />
          <ul>
            <li><Link to="/About">About Us</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="content">
        <Globe />

        <div className="container">
          <div className="top-section">
            <div className="SVUFFlexBarContainer">
              <div className="SVU1">
                <div className="inner-box">Status</div>
                <div className="inner-box">Box 1B</div>
              </div>
              <div className="SVU2">
                <div className="inner-box">Version</div>
                <div className="inner-box">v0.3</div>
              </div>
              <div className="SVU3">
                <div className="inner-box">Uptime</div>
                <div className="inner-box">99.99%</div>
              </div>
            </div>
          </div>

          <div className="middle-section">
            {/* 🔹 Project Directory */}
            <div className="left-pane">
              <div className="ProjectDirectory">
                <h2>Project Directory</h2>
                <hr />
                <ul>
                  {projects.length === 0 ? (
                    <li>No Projects</li>
                  ) : (
                    projects.map((proj) => (
                      <li
                        key={proj.id}
                        className={selectedProject?.id === proj.id ? "active" : ""}
                        onClick={() => handleProjectClick(proj)}
                      >
                        {proj.name}
                      </li>
                    ))
                  )}
                </ul>
                <FaPlusCircle className="add-icon" title="Add New Project" />
              </div>
            </div>

            {/* CSV Upload Section */}
            <div className="UContainer">
              <div className="topdiv"></div>
              <div className="bottomdiv">
                <div className="CSVTitle">
                  Upload a New Transactions File to Learn About the Transactions
                  and their History
                </div>
                <div className="CSVUploadbutton">
                  <Link to="/main/form">
                    <button className="upload-btn">Upload a new CSV File</button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="right-pane">
              <div className="right-top">
                <DonutChart accuracy={90} />
              </div>
            </div>
          </div>

          <div className="bottom-section">
            <MPMarquee items={items} />
          </div>
        </div>
      </main>
    </div>
  );
}

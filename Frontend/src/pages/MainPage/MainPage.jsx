import React, { useState, useRef, useEffect } from "react";
import "./MainPage.css";
import Globe from "../../components/Globe";
import DonutChart from "../../components/ModelErrorDonutChart/MEDonutChart";
import MPMarquee from "../../components/MPMarquee/MPMarquee";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const sidebarRef = useRef(null);
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

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/projects");
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".hamburger")
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  // Add new project
  const handleAddProject = async () => {
    try {
      const response = await axios.post("http://localhost:5000/projects", {
        name: "Untitled Project"
      });
      if (response.status === 201) {
        const newProject = response.data.project;
        setProjects((prev) => [...prev, newProject]);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create new project");
    }
  };

  // Handle clicking a project
  const handleProjectClick = (project) => {
    // Save project name to localStorage to retrieve in FormPage
    localStorage.setItem("currentProject", project.name);
    navigate("/main/form");
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
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile"
            className="profile-image"
          />
          <span className="profile-name">John Doe</span>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`} ref={sidebarRef}>
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
            <div className="left-pane">
              <div className="ProjectDirectory">
                <h2>Project Directory</h2>
                <hr />
                <ul>
                  {projects.length === 0 && <li>None</li>}
                  {projects.map((project, index) => (
                    <li
                      key={index}
                      onClick={() => handleProjectClick(project)}
                      style={{ cursor: "pointer" }}
                    >
                      {project.name}
                    </li>
                  ))}
                </ul>
                <FaPlusCircle
                  className="add-icon"
                  onClick={handleAddProject}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div className="UContainer">
              <div className="topdiv"></div>
              <div className="bottomdiv">
                <div className="CSVTitle">
                  Upload a New Transactions File to Learn About the Transactions and their History
                </div>
                <div className="CSVUploadbutton">
                  <Link to="/main/form">
                    <button className="upload-btn">Upload a new CSV File</button>
                  </Link>
                </div>
              </div>
            </div>

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

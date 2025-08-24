import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Globe from "../../components/Globe";
import "./ReportsAndAnalyticsPage.css";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const Sidebar = ({ open }) => (
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
);

const AnalyticsContent = ({ open, setOpen, projects, selectedProject, setSelectedProject }) => {
  const [showDragDrop, setShowDragDrop] = useState(false);
  const defaultRadar = [
    { subject: "No Data", A: 0, fullMark: 100 },
  ];
  const defaultLine = [
    { name: "No Data", value: 0 },
  ];
  const defaultBar = [
    { name: "No Data", value: 0 },
  ];

  const radarData = selectedProject?.radar || defaultRadar;
  const lineData = selectedProject?.line || defaultLine;
  const barData = selectedProject?.bar || defaultBar;

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Simulate loading project data from dropped files (replace with actual file parsing logic)
      const file = files[0];
      const project = {
        name: file.name,
        summary: `Summary of ${file.name}`,
        radar: defaultRadar,
        line: defaultLine,
        bar: defaultBar,
      };
      setSelectedProject(project);
    }
    setShowDragDrop(false); // Hide after drop
  };

  return (
    <div className={`analytics-content ${open ? "sidebar-open" : ""}`}>
      <header className="header">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          <Menu size={24} />
        </button>

        {/* Projects Button */}
        <button
          className="projects-btn"
          onClick={() => setShowDragDrop(!showDragDrop)}
        >
          Projects
        </button>

        {/* Drag and Drop Area for Project Files */}
        {showDragDrop && (
          <div
            className="project-drag-drop"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {selectedProject ? (
              <span>{selectedProject.name}</span>
            ) : (
              <span>Drop a project file here</span>
            )}
          </div>
        )}

        <h1>Analytics</h1>
      </header>

      <div className="main-layout">
        <div className="left-container">
          <div className="chart-card">
            <h3>Analytics Overview</h3>
            <div className="charts-grid">
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Metrics"
                      dataKey="A"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#06b6d4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="right-container">
          <div className="info-box">
            <h3>Summary</h3>
            {selectedProject ? (
              <p>{selectedProject.summary}</p>
            ) : (
              <p>No data available. Drop a project file to see analytics.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Analytics() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      name: "Project Alpha",
      summary: "Summary of Project Alpha",
      radar: [
        { subject: "Sales", A: 120, fullMark: 150 },
        { subject: "Marketing", A: 98, fullMark: 150 },
      ],
      line: [
        { name: "Jan", value: 40 },
        { name: "Feb", value: 60 },
      ],
      bar: [
        { name: "Q1", value: 300 },
        { name: "Q2", value: 200 },
      ],
    },
    {
      name: "Project Beta",
      summary: "Summary of Project Beta",
      radar: [
        { subject: "Dev", A: 70, fullMark: 100 },
        { subject: "QA", A: 50, fullMark: 100 },
      ],
      line: [
        { name: "Jan", value: 20 },
        { name: "Feb", value: 30 },
      ],
      bar: [
        { name: "Q1", value: 100 },
        { name: "Q2", value: 150 },
      ],
    },
  ]);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="analytics">
      <div className="globe-bg">
        <Globe />
      </div>
      <Sidebar open={open} />
      <AnalyticsContent
        open={open}
        setOpen={setOpen}
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </div>
  );
}
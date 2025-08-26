import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Globe from "../../components/Globe";
import "./ReportsAndAnalyticsPage.css";
import axios from "axios";
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
        <li><Link to="/About">About Us</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  </aside>
);

const AnalyticsContent = ({ open, setOpen, selectedProject }) => {
  const defaultRadar = [{ subject: "No Data", A: 0, fullMark: 100 }];
  const defaultLine = [{ name: "No Data", value: 0 }];
  const defaultBar = [{ name: "No Data", value: 0 }];

  const radarData = selectedProject?.radar || defaultRadar;
  const lineData = selectedProject?.line || defaultLine;
  const barData = selectedProject?.bar || defaultBar;

  return (
    <div className={`analytics-content ${open ? "sidebar-open" : ""}`}>
      <header className="header">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          <Menu size={24} />
        </button>
        <h1>Analytics</h1>
      </header>

      <div className="main-layout">
        <div className="left-container">
          <div className="chart-card">
            <h3>Analytics Overview</h3>
            <div className="charts-grid">
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={250}>
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
                <ResponsiveContainer width="100%" height={250}>
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
                <ResponsiveContainer width="100%" height={250}>
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
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects") // replace with your backend API
      .then((res) => {
        setProjects(res.data);
        if (res.data.length > 0) setSelectedProject(res.data[0]); // select first project
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
      });
  }, []);

  return (
    <div className="analytics">
      <div className="globe-bg">
        <Globe />
      </div>
      <Sidebar open={open} />
      <AnalyticsContent
        open={open}
        setOpen={setOpen}
        selectedProject={selectedProject}
      />
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </div>
  );
}

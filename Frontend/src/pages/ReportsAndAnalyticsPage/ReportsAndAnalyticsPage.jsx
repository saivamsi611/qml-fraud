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
        <li><Link to="/main/analytics">Analytics</Link></li>
        <hr />
        <li><Link to="/main/settings">Settings</Link></li>
        <li><Link to="/main/help">Help</Link></li>
        <hr />
      </ul>
    </div>
    <div className="menu-bottom">
      <ul>
        <li>About Us</li>
        <li>Logout</li>
      </ul>
    </div>
  </aside>
);

const AnalyticsContent = ({ open, setOpen, radarData, lineData, barData }) => (
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
          <p>
            This panel highlights insights, trends, and recommendations across multiple performance metrics. Compare data across departments and track growth visually.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function Analytics() {
  const [open, setOpen] = useState(false);

  const radarData = [
    { subject: "Sales", A: 120, fullMark: 150 },
    { subject: "Marketing", A: 98, fullMark: 150 },
    { subject: "Development", A: 86, fullMark: 150 },
    { subject: "Support", A: 99, fullMark: 150 },
    { subject: "IT", A: 85, fullMark: 150 },
    { subject: "Admin", A: 65, fullMark: 150 },
  ];

  const lineData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 60 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 50 },
  ];

  const barData = [
    { name: "Q1", value: 300 },
    { name: "Q2", value: 200 },
    { name: "Q3", value: 400 },
    { name: "Q4", value: 250 },
  ];

  return (
    <div className="analytics">
      <div className="globe-bg">
        <Globe />
      </div>
      <Sidebar open={open} />
      <AnalyticsContent
        open={open}
        setOpen={setOpen}
        radarData={radarData}
        lineData={lineData}
        barData={barData}
      />
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </div>
  );
}

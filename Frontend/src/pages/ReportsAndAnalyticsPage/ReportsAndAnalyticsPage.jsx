import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Link, useLocation } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import "./ReportsAndAnalyticsPage.css";

const SOCKET_URL = "http://127.0.0.1:8080/comparision"; // ✅ use namespace

export default function Analytics() {
  const location = useLocation();
  const initialProject = location.state?.projectName || localStorage.getItem("currentProject") || "testcsv";
  const [projectName, setProjectName] = useState(initialProject);

  const [trainingStatus, setTrainingStatus] = useState("Idle");
  const [finalResults, setFinalResults] = useState(null);
  const [metrics, setMetrics] = useState({ loss: [], accuracy: [], f1: [], auc: [] });

  const socketRef = useRef(null);
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Sidebar click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest(".hamburger")) {
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

  // Save project name
  useEffect(() => {
    if (projectName) localStorage.setItem("currentProject", projectName);
  }, [projectName]);

  // Socket.IO connection
  useEffect(() => {
    if (socketRef.current) socketRef.current.disconnect();
    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    socketRef.current.on("connect", () => console.log("✅ Socket connected"));
    socketRef.current.on("disconnect", () => console.log("❌ Socket disconnected"));

    socketRef.current.on("training_progress", (data) => {
      if (data.project_name !== projectName) return;

      // Only update valid numbers
      const safeNum = (v) => (typeof v === "number" && !isNaN(v) ? v : null);
      const updateMetric = (key, value) => {
        if (value != null && data.epoch != null) {
          setMetrics((prev) => ({
            ...prev,
            [key]: [...prev[key], { epoch: data.epoch, value }],
          }));
        }
      };

      updateMetric("loss", safeNum(data.loss));
      updateMetric("accuracy", safeNum(data.accuracy));
      updateMetric("f1", safeNum(data.f1));
      updateMetric("auc", safeNum(data.auc));

      setTrainingStatus(
        `Epoch ${data.epoch}/${data.total_epochs} | ${data.progress}% | Loss: ${data.loss?.toFixed(4)} | Acc: ${data.accuracy?.toFixed(4)}`
      );
    });

    socketRef.current.on("training_complete", (data) => {
      if (data.project_name !== projectName) return;
      setFinalResults(data.results);
      setTrainingStatus("✅ Training completed!");
    });

    socketRef.current.on("training_error", (err) => {
      setTrainingStatus(`❌ Error: ${err.message || err}`);
    });

    return () => socketRef.current.disconnect();
  }, [projectName]);

  // Auto-start training
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(`${SOCKET_URL.replace("/comparision","")}/train?project_name=${encodeURIComponent(projectName)}`)
        .then((res) => res.json())
        .then((json) => {
          setTrainingStatus(
            json.status === "success" ? "✅ Training started..." : `❌ ${json.message || "Unknown error"}`
          );
        })
        .catch(() => setTrainingStatus("❌ Failed to start training"));
    }, 500);
    return () => clearTimeout(timeout);
  }, [projectName]);

  const chartConfigs = [
    { title: "Loss", key: "loss", stroke: "#ef4444" },
    { title: "Accuracy", key: "accuracy", stroke: "#10b981" },
    { title: "F1 Score", key: "f1", stroke: "#3b82f6" },
    { title: "AUC", key: "auc", stroke: "#8b5cf6" },
  ];

  const statusClass = trainingStatus.includes("✅")
    ? "success"
    : trainingStatus.includes("❌")
    ? "error"
    : "info";

  return (
    <div className={`app ${open ? "shrink" : ""}`}>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle Sidebar">☰</button>
      <aside className={`sidebar ${open ? "open" : ""}`} ref={sidebarRef}>
        <div className="menu-top">
          <ul>
            <li><Link to="/main">Home</Link></li>
            <li><Link to="/main/dashboard">Dashboard</Link></li>
          </ul>
          <hr />
          <ul>
            <li><Link to="/main/reportsAndAnalytics">Reports & Analytics</Link></li>
            <li>{projectName ? <Link to={`/main/ComparisionTab/${projectName}`}>Comparison Tab</Link> : <span className="disabled">Comparison Tab (Select Project)</span>}</li>
          </ul>
          <hr />
          <ul>
            <li><Link to="/main/settings">Settings</Link></li>
            <li><Link to="/main/help">Help</Link></li>
          </ul>
          <hr />
        </div>
        <div className="menu-bottom">
          <ul>
            <li><Link to="/About">About Us</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </div>
      </aside>

      <div className="analytics-layout">
        <div className="left-panel">
          <div className="input-group card">
            <label htmlFor="projectName">Project Name</label>
            <input
              id="projectName"
              className="project-input"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          {finalResults && (
            <div className="report-card card">
              <h3>📊 Classification Report</h3>
              {finalResults.classification_report ? (
                <table>
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Recall</th>
                      <th>Loss</th>
                      <th>F1-score</th>
                      <th>Support</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(finalResults.classification_report).map(([cls, metrics]) => (
                      <tr key={cls}>
                        <td>{cls}</td>
                        <td>{metrics.recall?.toFixed(2)}</td>
                        <td>{metrics.loss?.toFixed(2)}</td>
                        <td>{metrics.f1_score?.toFixed(2)}</td>
                        <td>{metrics.support}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : <pre><code>{JSON.stringify(finalResults, null, 2)}</code></pre>}
            </div>
          )}
        </div>

        <div className="center-panel">
          <div className="charts-grid">
            {chartConfigs.map(({ title, key, stroke }) => (
              <div className="chart-card card" key={key}>
                <div className="card-header">{title}</div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={metrics[key]}>
                    <CartesianGrid stroke="#334155" />
                    <XAxis dataKey="epoch" />
                    <YAxis domain={['auto','auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke={stroke} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>

        <div className="right-panel">
          <div className={`training-status card ${statusClass}`}>{trainingStatus}</div>
        </div>
      </div>
    </div>
  );
}

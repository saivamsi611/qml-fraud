import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { io } from "socket.io-client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./ComparisionPage.css";

// Generate summary for charts
function generateSummary(qml, ml) {
  if (!qml.length && !ml.length) return "⏳ Waiting for performance data...";

  const latestQML = qml[qml.length - 1] || {};
  const latestML = ml[ml.length - 1] || {};

  let summary = `📊 After ${qml.length} epochs:\n`;
  summary += `• QML Accuracy = ${(latestQML.accuracy * 100 || 0).toFixed(1)}%, ML Accuracy = ${(latestML.accuracy * 100 || 0).toFixed(1)}%\n`;
  summary += `• QML F1 = ${(latestQML.f1 * 100 || 0).toFixed(1)}%, ML F1 = ${(latestML.f1 * 100 || 0).toFixed(1)}\n\n`;

  summary += latestQML.accuracy > latestML.accuracy
    ? "✅ QML shows slightly better accuracy.\n"
    : "✅ ML matches or exceeds QML in accuracy.\n";

  summary += latestQML.f1 > latestML.f1
    ? "✅ QML also achieves stronger F1 performance."
    : "✅ ML has equal or better F1 performance.";

  return summary;
}

export default function ComparisionPage() {
  const { project_name } = useParams();
  const [qmlData, setQmlData] = useState([]);
  const [mlData, setMlData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Sidebar outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".hamburger")
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Fetch ML results from in-memory task_results
  useEffect(() => {
    if (!project_name) return;

    axios.get(`http://127.0.0.1:8080/task/${project_name}`)
      .then(res => {
        const data = res.data.result || {};
        const mlHistory = data.ml?.history || [];  // in-memory ML results
        setMlData(mlHistory);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [project_name]);

  // Socket updates only for QML
  useEffect(() => {
    if (!project_name) return;

    const socket = io("http://127.0.0.1:8080/comparision", {
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("✅ Connected to Socket.IO"));
    socket.on("disconnect", () => console.log("❌ Socket disconnected"));

    socket.on("training_progress", (data) => {
      if (data.project_name !== project_name) return;

      if (data.model_type === "qml") {
        setQmlData(prev => [
          ...prev,
          {
            epoch: data.epoch,
            accuracy: data.accuracy ?? 0,
            f1: data.f1 ?? 0,
          }
        ]);
      }
    });

    return () => socket.disconnect();
  }, [project_name]);

  return (
    <div className={`dashboard app ${open ? "shrink" : ""}`}>
      <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>

      <aside className={`sidebar ${open ? "open" : ""}`} ref={sidebarRef}>
        <div className="menu-top">
          <ul>
            <li><Link to="/main">Home</Link></li>
            <li><Link to="/main/dashboard">Dashboard</Link></li>
          </ul>
          <hr />
          <ul>
            <li><Link to="/main/reportsAndAnalytics">Reports & Analytics</Link></li>
            <li>{project_name ? <Link to={`/main/ComparisionTab/${project_name}`}>Comparison Tab</Link> : <span className="disabled">Comparison Tab</span>}</li>
          </ul>
        </div>
      </aside>

      <div className="grid-layout">
        {/* QML Chart */}
        <section className="card">
          <h2 className="section-title">Quantum ML</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={qmlData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dcdcdc" />
              <XAxis dataKey="epoch" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#6C63FF" strokeWidth={2} />
              <Line type="monotone" dataKey="f1" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* ML Chart */}
        <section className="card">
          <h2 className="section-title">Classical ML</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mlData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dcdcdc" />
              <XAxis dataKey="epoch" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#FF7043" strokeWidth={2} />
              <Line type="monotone" dataKey="f1" stroke="#388E3C" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>

      <section className="card summary">
        <h2 className="section-title">Summary</h2>
        <pre className="summary-text">{generateSummary(qmlData, mlData)}</pre>
      </section>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import "./ReportsAndAnalyticsPage.css";

const SOCKET_URL = "http://127.0.0.1:8080";

export default function Analytics() {
  const [projectName, setProjectName] = useState("testcsv");
  const [trainingStatus, setTrainingStatus] = useState("Idle");
  const [finalResults, setFinalResults] = useState(null);

  const [metrics, setMetrics] = useState({
    loss: [],
    accuracy: [],
    f1: [],
    auc: [],
    precision: [],
    recall: [],
  });

  const socketRef = useRef(null);

  useEffect(() => {
    if (socketRef.current) socketRef.current.disconnect();

    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    socketRef.current.on("connect", () => console.log("✅ Socket connected"));
    socketRef.current.on("disconnect", () => console.log("❌ Socket disconnected"));

    socketRef.current.on("training_progress", (data) => {
      if (data.project_name !== projectName) return;

      const safe = (v) => (typeof v === "number" && !isNaN(v) ? v : null);
      const update = (key, value) => {
        if (value !== null) {
          setMetrics((prev) => ({
            ...prev,
            [key]: [...prev[key], { epoch: data.epoch, value }],
          }));
        }
      };

      update("loss", safe(data.loss));
      update("accuracy", safe(data.accuracy));
      update("f1", safe(data.f1));
      update("auc", safe(data.auc));
      update("precision", safe(data.precision));
      update("recall", safe(data.recall));

      setTrainingStatus(
        `Epoch ${data.epoch}/${data.total_epochs} | ${data.progress}% | Loss: ${data.loss?.toFixed(4)} | Acc: ${data.accuracy?.toFixed(4)}`
      );
    });

    socketRef.current.on("training_complete", (data) => {
      setFinalResults(data.results);
      setTrainingStatus("✅ Training completed!");
    });

    socketRef.current.on("training_error", (err) => {
      setTrainingStatus(`❌ Error: ${err.message || err}`);
    });

    return () => socketRef.current.disconnect();
  }, [projectName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(`${SOCKET_URL}/train?project_name=${encodeURIComponent(projectName)}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === "success") {
            setTrainingStatus("✅ Training started...");
          } else {
            setTrainingStatus(`❌ ${json.message || "Unknown error"}`);
          }
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
    { title: "Precision", key: "precision", stroke: "#f97316" },
    { title: "Recall", key: "recall", stroke: "#06b6d4" },
  ];

  const statusClass = trainingStatus.includes("✅")
    ? "success"
    : trainingStatus.includes("❌")
    ? "error"
    : "info";

return (
  <div className="analytics-page">
    <div className="analytics-layout">
      {/* Left Panel */}
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
            <pre>
              {JSON.stringify(
                finalResults.classification_report || finalResults.summary || finalResults,
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>

      {/* Center Panel - Grid of Charts */}
      <div className="center-panel">
        <div className="charts-grid">
          {chartConfigs.map(({ title, key, stroke }) => (
            <div className="chart-card card" key={key}>
              <div className="card-header">{title}</div>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={metrics[key]}>
                  <CartesianGrid stroke="#334155" />
                  <XAxis dataKey="epoch" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke={stroke} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className={`training-status card ${statusClass}`}>
          {trainingStatus}
        </div>
      </div>
    </div>
  </div>
);

}

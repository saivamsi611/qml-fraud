import React, { useState } from "react";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2"; // ✅ Radar added
import { motion, AnimatePresence } from "framer-motion";
import Globe from "./components/Globe"; // ✅ Fullscreen Globe
import "./index.css"; // ✅ global styles
import "./styles.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale, // ✅ Needed for Radar
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="app-background">
      {/* 🌍 Fullscreen Globe Background */}
      <Globe />

      {/* HEADER */}
      <header className="header">
        <div className="logo">💳 QML Fraud Detection</div>
        <nav>
          {["dashboard", "reports", "settings", "about"].map((page) => (
            <button
              key={page}
              className={activePage === page ? "active" : ""}
              onClick={() => setActivePage(page)}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">
        <AnimatePresence mode="wait">
          {/* Dashboard */}
          {activePage === "dashboard" && (
            <motion.div
              key="dashboard"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="glass-card"
            >
              <h2>Single Transaction Check</h2>
              <input type="number" placeholder="Amount ($)" />
              <input type="number" placeholder="Time Gap (minutes)" />
              <button>Check Transaction</button>

              {/* CSV Upload Section */}
              <div className="csv-upload">
                <h3>Upload Transaction CSV</h3>
                <input type="file" accept=".csv" />
                <button>Upload</button>
              </div>
            </motion.div>
          )}

          {/* Reports Page */}
          {activePage === "reports" && (
            <motion.div
              key="reports"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="glass-card"
            >
              <h2>Transaction Reports</h2>

              <div className="charts-grid">
                {/* Line Chart */}
                <div className="chart-card">
                  <Line
                    data={{
                      labels: ["Tx 1", "Tx 2", "Tx 3", "Tx 4", "Tx 5"],
                      datasets: [
                        {
                          label: "Transaction Amounts",
                          data: [200, 1200, 400, 2200, 1500],
                          borderColor: "#06B6D4",
                          backgroundColor: "rgba(6,182,212,0.25)",
                          tension: 0.4,
                          fill: true,
                          pointBackgroundColor: [
                            "#22C55E",
                            "#F43F5E",
                            "#EAB308",
                            "#3B82F6",
                            "#8B5CF6",
                          ],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { labels: { color: "#E2E8F0" } } },
                      scales: {
                        x: {
                          ticks: { color: "#94A3B8" },
                          grid: { color: "rgba(255,255,255,0.08)" },
                        },
                        y: {
                          ticks: { color: "#94A3B8" },
                          grid: { color: "rgba(255,255,255,0.08)" },
                        },
                      },
                    }}
                  />
                </div>

                {/* Bar Chart */}
                <div className="chart-card">
                  <Bar
                    data={{
                      labels: ["Normal", "Fraud"],
                      datasets: [
                        {
                          label: "Transaction Count",
                          data: [320, 85],
                          backgroundColor: ["#22C55E", "#F43F5E"],
                          borderRadius: 8,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { labels: { color: "#E2E8F0" } } },
                      scales: {
                        x: {
                          ticks: { color: "#94A3B8" },
                          grid: { color: "rgba(255,255,255,0.08)" },
                        },
                        y: {
                          ticks: { color: "#94A3B8" },
                          grid: { color: "rgba(255,255,255,0.08)" },
                        },
                      },
                    }}
                  />
                </div>

                {/* Doughnut Chart */}
                <div className="chart-card">
                  <Doughnut
                    data={{
                      labels: ["Normal", "Fraud"],
                      datasets: [
                        {
                          data: [75, 25],
                          backgroundColor: ["#22C55E", "#F43F5E"],
                          borderColor: "#0F172A",
                          borderWidth: 2,
                          hoverOffset: 8,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { labels: { color: "#E2E8F0" } } },
                    }}
                  />
                </div>

                {/* Radar Chart */}
                <div className="chart-card">
                  <Radar
                    data={{
                      labels: [
                        "Speed",
                        "Amount",
                        "Frequency",
                        "Risk Score",
                        "Geo Distance",
                      ],
                      datasets: [
                        {
                          label: "Fraud Profile",
                          data: [90, 70, 85, 95, 60],
                          borderColor: "#F43F5E",
                          backgroundColor: "rgba(244,63,94,0.25)",
                        },
                        {
                          label: "Normal Profile",
                          data: [40, 60, 45, 35, 70],
                          borderColor: "#22C55E",
                          backgroundColor: "rgba(34,197,94,0.25)",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { labels: { color: "#E2E8F0" } } },
                      scales: {
                        r: {
                          grid: { color: "rgba(255,255,255,0.08)" },
                          angleLines: { color: "rgba(255,255,255,0.08)" },
                          pointLabels: { color: "#CBD5E1" },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Reports Table */}
            <div className="report-table-wrapper">
  <table className="report-table">
    <thead>
      <tr>
        <th>Amount</th>
        <th>Time Gap</th>
        <th>Prediction</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$200</td>
        <td>2 min</td>
        <td className="normal">🟢 Normal</td>
      </tr>
      <tr>
        <td>$1200</td>
        <td>0.4 min</td>
        <td className="fraud">🔴 Fraud</td>
      </tr>
    </tbody>
  </table>
</div>
            </motion.div>
          )}

          {/* Settings */}
          {activePage === "settings" && (
            <motion.div
              key="settings"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="glass-card"
            >
              <h2>Settings</h2>
              <p>Adjust fraud detection thresholds and preferences here.</p>
            </motion.div>
          )}

          {/* About */}
          {activePage === "about" && (
            <motion.div
              key="about"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="glass-card"
            >
              <h2>About Us</h2>
              <p>
                QML Fraud Detection is a cutting-edge platform that uses
                quantum-inspired machine learning algorithms to detect fraudulent
                transactions in real time.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 QML Fraud Detection. All rights reserved.
      </footer>
    </div>
  );
}

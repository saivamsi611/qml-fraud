import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Dashboard.css";

const data = [
  { name: "Critical Risk", value: null },
  { name: "Low Risk", value: null },
  { name: "Approved", value: null },
];

const COLORS = ["#ef4444", "#facc15", "#22c55e"];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Dashboard</h1>

      {/* Top Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Transactions</h3>
          <p>{null}</p>
        </div>
        <div className="stat-card">
          <h3>Critical Risk</h3>
          <p>{null}</p>
        </div>
        <div className="stat-card">
          <h3>Total Amount</h3>
          <p>{null}</p>
        </div>
        <div className="stat-card">
          <h3>Approved</h3>
          <p>{null}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="chart-section">
        <h2>Fraud Detection Overview</h2>
        <PieChart width={350} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>---</td>
              <td>{null}</td>
              <td><span className="status pending">Pending</span></td>
            </tr>
            <tr>
              <td>---</td>
              <td>{null}</td>
              <td><span className="status approved">Approved</span></td>
            </tr>
            <tr>
              <td>---</td>
              <td>{null}</td>
              <td><span className="status critical">Critical</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Globe from "../../components/Globe";
import "./Dashboard.css";

import  dummyTransactions,{dummyGrowth} from "/src/Data/dummyTransactions";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("U123");
  const [currentTxIndex, setCurrentTxIndex] = useState(0);

  // Transactions state
  const [transactions, setTransactions] = useState([]);

  // Filter transactions for the current user
  const userTransactions = transactions.filter((tx) => tx.user === userId);

  // Stats and chart data
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
  const [riskData, setRiskData] = useState([]);
  const [growthData, setGrowthData] = useState([]);

  // Update stats and risk data based on transactions
  useEffect(() => {
    const total = transactions.length;
    const approved = transactions.filter((tx) => tx.status === "approved").length;
    const pending = transactions.filter((tx) => tx.status === "pending").length;
    const rejected = transactions.filter((tx) => tx.status === "rejected").length;

    setStats({ total, approved, pending, rejected });

    setRiskData([
      { name: "Approved", value: approved },
      { name: "Pending", value: pending },
      { name: "Rejected", value: rejected },
    ]);
  }, [transactions]);

  // Auto-loop through user transactions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTxIndex((prevIndex) =>
        userTransactions.length === 0 ? 0 : (prevIndex + 1) % userTransactions.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [userTransactions]);

  // Use dummy data instead of fetching from backend
  useEffect(() => {
    setTransactions(dummyTransactions);
    setGrowthData(dummyGrowth);
  }, []);

  const riskColors = ["#22c55e", "#facc15", "#ef4444"]; // Green, Yellow, Red

  function approveTransaction(id) {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: "approved" } : tx))
    );
  }

  function rejectTransaction(id) {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: "rejected" } : tx))
    );
  }

  return (
    <div className="dashboard">
      <div className="globe-bg">
        <Globe />
      </div>

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

      <div className={`dashboard-content ${open ? "sidebar-open" : ""}`}>
        <header className="header">
          <button className="hamburger" onClick={() => setOpen(!open)}>
            <Menu size={24} />
          </button>
          <h1>Dashboard</h1>
        </header>

        <div className="main-layout">
          <div className="left-panel">
            <div className="stats-row">
              <div className="stat-box">
                <h3>User</h3>
                <p>{userId}</p>
              </div>
              <div className="stat-box">
                <h3>Approved</h3>
                <p>{stats.approved}</p>
              </div>
              <div className="stat-box">
                <h3>Pending</h3>
                <p>{stats.pending}</p>
              </div>
              <div className="stat-box">
                <h3>Rejected</h3>
                <p>{stats.rejected}</p>
              </div>
            </div>

            <div className="chart-box">
              <h2>Risk Analysis</h2>
              <PieChart width={270} height={260}>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={riskColors[index % riskColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>

              <div className="loop-transaction" style={{ marginTop: 20 }}>
                <h2>Live Transaction View</h2>
                {userTransactions.length > 0 ? (
                  <div className="live-card">
                    <p><strong>User:</strong> {userTransactions[currentTxIndex].user}</p>
                    <p><strong>Amount:</strong> ₹{userTransactions[currentTxIndex].amount}</p>
                    <p><strong>Status:</strong> {userTransactions[currentTxIndex].status}</p>
                  </div>
                ) : (
                  <p>No transactions found for user {userId}</p>
                )}
              </div>
            </div>
          </div>

          <div className="right-panel">
            <h2>Recent Transactions</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.user}</td>
                      <td>₹{tx.amount}</td>
                      <td className={`status ${tx.status}`}>{tx.status}</td>
                      <td>
                        {tx.status !== "approved" && (
                          <button
                            onClick={() => approveTransaction(tx.id)}
                            className="approve-btn"
                          >
                            Approve
                          </button>
                        )}
                        {tx.status !== "rejected" && (
                          <button
                            onClick={() => rejectTransaction(tx.id)}
                            className="reject-btn"
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="chart-box" style={{ marginTop: 40 }}>
              <h2>Monthly Growth</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="var(--text-primary)" />
                  <YAxis stroke="var(--text-primary)" />
                  <Tooltip />
                  <Bar dataKey="growth" fill="var(--accent)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Globe from "../../components/Globe";
import "./Dashboard.css";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  // ✅ States for dynamic data from backend
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0 });
  const [riskData, setRiskData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [growthData, setGrowthData] = useState([]);

  // ✅ Fetch data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard") // Change URL to your backend
      .then((res) => {
        const { stats, risks, transactions, growth } = res.data;

        setStats(stats || { total: 0, approved: 0, pending: 0 });
        setRiskData(risks || []);
        setTransactions(transactions || []);
        setGrowthData(growth || []);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
      });
  }, []);

  const riskColors = ["#ef4444", "#facc15", "#22c55e"];

  return (
    <div className="dashboard">
      <div className="globe-bg">
        <Globe />
      </div>

      <aside className={`sidebar ${open ? "open" : ""}`}>
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
                <h3>Total Users</h3>
                <p>{stats.total}</p>
              </div>
              <div className="stat-box">
                <h3>Approved</h3>
                <p>{stats.approved}</p>
              </div>
              <div className="stat-box">
                <h3>Pending</h3>
                <p>{stats.pending}</p>
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
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.user}</td>
                      <td>{tx.amount}</td>
                      <td className={`status ${tx.status}`}>{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Growth Bar Chart */}
            <div className="chart-box">
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

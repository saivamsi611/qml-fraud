import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Globe from "../../components/Globe";
import "./Dashboard.css";

const riskData = [
  { name: "Critical Risk", value: 20 },
  { name: "Low Risk", value: 35 },
  { name: "Approved", value: 45 },
];

const riskColors = ["#ef4444", "#facc15", "#22c55e"];

const transactions = [
  { id: 1, user: "Lokesh", amount: "₹500", status: "approved" },
  { id: 2, user: "Rahul", amount: "₹750", status: "pending" },
  { id: 3, user: "Anjali", amount: "₹300", status: "critical" },
  { id: 4, user: "Kiran", amount: "₹1200", status: "approved" },
];

// Sample data for the new bar chart
const growthData = [
  { month: "Jan", growth: 30 },
  { month: "Feb", growth: 45 },
  { month: "Mar", growth: 60 },
  { month: "Apr", growth: 35 },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);

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
                <h3>Total Users</h3>
                <p>1,245</p>
              </div>
              <div className="stat-box">
                <h3>Approved</h3>
                <p>980</p>
              </div>
              <div className="stat-box">
                <h3>Pending</h3>
                <p>165</p>
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
                    <Cell key={`cell-${index}`} fill={riskColors[index % riskColors.length]} />
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

            {/* New Growth Bar Chart */}
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

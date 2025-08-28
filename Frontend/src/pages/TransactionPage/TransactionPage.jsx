import React, { useState, useEffect } from "react";
import axios from "axios";
import Globe from "../../components/Globe";
import "./TransactionPage.css";

const API = "https://backend-production-5e92.up.railway.app";

export default function TransactionPage() {
  // Dummy users
  const dummyUsers = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const [users] = useState(dummyUsers);
  const [userId, setUserId] = useState(dummyUsers[0].id);
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("India");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Fraud check module
  const checkTransaction = (transaction) => {
    if (transaction.amount > 100000)
      return { status: "fraud", message: "Amount exceeds 100,000!" };

    if (transaction.location.toLowerCase() !== "india")
      return { status: "fraud", message: "Transactions allowed only in India!" };

    if (Math.random() < 0.05)
      return { status: "fraud", message: "Random fraud detection!" };

    return { status: "genuine", message: "Transaction approved" };
  };

  // Handle transaction submission
  const submitTxn = (e) => {
    e.preventDefault();

    const transaction = {
      user_id: Number(userId),
      amount: Number(amount),
      location: location.trim(),
      ts: Math.floor(Date.now() / 1000),
    };

    const resultCheck = checkTransaction(transaction);

    // Update history
    setHistory((prev) => [...prev, { ...transaction, ...resultCheck }]);

    // Show message box
    if (resultCheck.status === "genuine") {
      setResult({ type: "ok", text: "Transaction Completed ✅" });
    } else {
      setResult({ type: "err", text: `Transaction Blocked ❌: ${resultCheck.message}` });
      alert(`⚠️ Fraud Detected: ${resultCheck.message}`);
    }

    // Reset form fields
    setAmount("");
    setLocation("India");
  };

  return (
    <div className="transaction-page-container" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Globe background */}
      <div className="globe-background" style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden"
      }}>
        <Globe />
      </div>

      {/* Foreground content */}
      <div className="transaction-content" style={{
        position: "relative",
        zIndex: 1,
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "rgba(11, 29, 77, 0.85)",
        borderRadius: "12px",
        color: "#e0e0ff"
      }}>
        <h2>💳 Credit Card Fraud Detection Module</h2>

        {/* Form */}
        <form onSubmit={submitTxn} style={{ display: "grid", gap: "12px", maxWidth: "400px", margin: "0 auto" }}>
          <label>
            User
            <select value={userId} onChange={(e) => setUserId(e.target.value)}>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} (#{u.id})
                </option>
              ))}
            </select>
          </label>

          <label>
            Amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>

          <label>
            Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>

          <button type="submit">Submit Transaction</button>
        </form>

        {/* Floating Result Message Box */}
        {result && (
          <div className={`result-box ${result.type}`}>
            {result.text}
          </div>
        )}

        {/* History Table */}
        <h3 style={{ marginTop: "20px" }}>📜 Transaction History</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd" }}>
              <th>Time</th>
              <th>Amount</th>
              <th>Location</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {history.map((t, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td>{new Date(t.ts * 1000).toLocaleString()}</td>
                <td>{t.amount}</td>
                <td>{t.location}</td>
                <td style={{ color: t.status === "genuine" ? "lightgreen" : "red" }}>
                  {t.status}
                </td>
                <td>{t.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
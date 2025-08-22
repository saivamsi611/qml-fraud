import React from "react";
import "./ReportsAndAnalyticsPage.css";

const Analytics = () => {
  // Data placeholders (dummy values or null)
  const totalRings = null;
  const criticalRisk = null;
  const totalAmount = null;
  const totalMembers = null;

  const fraudRings = [
    {
      ringId: null,
      members: [],
      totalAmount: null,
      detectionMethod: null,
      detectionDate: null,
      riskLevel: null,
      status: null,
    },
  ];

  return (
    <div className="analytics-container">
      {/* Top Stats Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h4>Total Rings</h4>
          <p>{totalRings ?? "--"}</p>
        </div>
        <div className="stat-card">
          <h4>Critical Risk</h4>
          <p>{criticalRisk ?? "--"}</p>
        </div>
        <div className="stat-card">
          <h4>Total Amount</h4>
          <p>{totalAmount ? `$${totalAmount}` : "--"}</p>
        </div>
        <div className="stat-card">
          <h4>Total Members</h4>
          <p>{totalMembers ?? "--"}</p>
        </div>
      </div>

      {/* Fraud Rings Section */}
      <div className="fraud-section">
        <h3>🔍 Detected Fraud Rings</h3>
        {fraudRings.map((ring, index) => (
          <div key={index} className="fraud-card">
            <h4>{ring.ringId ?? "ring_xxx - CRITICAL"}</h4>
            <p><strong>Ring ID:</strong> {ring.ringId ?? "--"}</p>
            <p><strong>Total Amount:</strong> {ring.totalAmount ? `$${ring.totalAmount}` : "--"}</p>
            <p><strong>Detection Method:</strong> {ring.detectionMethod ?? "--"}</p>
            <p><strong>Detection Date:</strong> {ring.detectionDate ?? "--"}</p>
            <p><strong>Risk Level:</strong> {ring.riskLevel ?? "--"}</p>
            <p><strong>Status:</strong> {ring.status ?? "--"}</p>

            {/* Members Table */}
            <h5>👥 Ring Members</h5>
            <table className="members-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Role</th>
                  <th>Risk Score</th>
                </tr>
              </thead>
              <tbody>
                {ring.members.length > 0 ? (
                  ring.members.map((m, i) => (
                    <tr key={i}>
                      <td>{m.userId ?? "--"}</td>
                      <td>{m.role ?? "--"}</td>
                      <td>{m.riskScore ?? "--"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No members available</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Network Visualization Placeholder */}
            <div className="network-box">
              <h5>🌐 Network Visualization</h5>
              <div className="network-placeholder">
                Network graph will appear here
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;

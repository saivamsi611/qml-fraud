import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard() {
  const [chartData] = useState({
    labels: ["Tx 1", "Tx 2", "Tx 3", "Tx 4"],
    datasets: [
      {
        label: "Transaction Amounts",
        data: [200, 1200, 400, 2200],
        borderColor: "#00f7ff",
        backgroundColor: "rgba(0,247,255,0.15)",
        tension: 0.4,
        pointBackgroundColor: ["#00ffb2", "#ff6bcb", "#00ffb2", "#ff6bcb"],
        pointRadius: 6,
      },
    ],
  });

  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = window.VANTA.NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x00e5ff,
      backgroundColor: 0x050914,
      points: 14.0,
      maxDistance: 22.0,
      spacing: 17.0,
    });
    return () => vantaEffect && vantaEffect.destroy();
  }, []);

  return (
    <div className="dashboard">
      {/* Background Layer */}
      <div ref={vantaRef} className="vanta-layer"></div>

      {/* Foreground Content */}
      <div className="page-content">
        {/* HERO */}
        <section className="hero">
          <h1>
            Quantum-Powered <span>Fraud Detection</span>
          </h1>
          <p>Protect transactions with real-time AI precision & futuristic tech.</p>
        </section>

        {/* MAIN CONTENT */}
        <div className="glass-card">
          <h2>Single Transaction Check</h2>
          <input type="number" placeholder="Amount ($)" />
          <input type="number" placeholder="Time Gap (minutes)" />
          <button>Check Transaction</button>
        </div>

        <div className="glass-card">
          <h2>Batch Upload (CSV)</h2>
          <input type="file" accept=".csv" />
          <div className="chart-container">
            <Line data={chartData} />
          </div>
          <table>
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
                <td className="normal">Normal</td>
              </tr>
              <tr>
                <td>$1200</td>
                <td>0.4 min</td>
                <td className="fraud">Fraud</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

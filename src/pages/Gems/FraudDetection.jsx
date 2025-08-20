import React, { useState } from "react";
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
import { motion } from "framer-motion";
import "./FraudDetection.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function FraudDetection() {
  const [amount, setAmount] = useState("");
  const [timeGap, setTimeGap] = useState("");
  const [result, setResult] = useState("");
  const [batchResults, setBatchResults] = useState([]);

  const chartData = {
    labels: batchResults.map((_, i) => `Tx ${i + 1}`),
    datasets: [
      {
        label: "Transaction Amounts",
        data: batchResults.map(row => parseFloat(row.amt)),
        borderColor: "#00e0ff",
        backgroundColor: "rgba(0,224,255,0.2)",
        tension: 0.4,
        pointBackgroundColor: batchResults.map(row =>
          row.prediction === "Fraud" ? "#ff4d6d" : "#00ff88"
        ),
      },
    ],
  };

  const handlePredict = () => {
    if (!amount || !timeGap) {
      alert("Please enter both fields!");
      return;
    }
    const isFraud = parseFloat(amount) > 1000 || parseFloat(timeGap) < 0.5;
    setResult(isFraud ? "🚨 Fraud Detected!" : "✅ Transaction Normal");
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split("\n").slice(1); // skip header
      const results = lines
        .filter(line => line.trim() !== "")
        .map((line) => {
          const [amt, gap] = line.split(",");
          const isFraud = parseFloat(amt) > 1000 || parseFloat(gap) < 0.5;
          return { amt, gap, prediction: isFraud ? "Fraud" : "Normal" };
        });
      setBatchResults(results);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fraud-detection container">
      <motion.h1
        className="page-title"
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5}}
      >
        💳 Fraud Detection Dashboard
      </motion.h1>

      {/* Single Transaction */}
      <motion.div
        className="card-box"
        initial={{opacity:0, x:-20}}
        animate={{opacity:1, x:0}}
        transition={{duration:0.5}}
      >
        <h2>Single Transaction Check</h2>
        <input
          type="number"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Time Gap (minutes)"
          value={timeGap}
          onChange={(e) => setTimeGap(e.target.value)}
        />
        <button onClick={handlePredict}>Check Transaction</button>
        {result && <p className="result">{result}</p>}
      </motion.div>

      {/* Batch Transactions */}
      <motion.div
        className="card-box"
        initial={{opacity:0, x:20}}
        animate={{opacity:1, x:0}}
        transition={{duration:0.5, delay:0.2}}
      >
        <h2>Batch Upload (CSV)</h2>
        <input type="file" accept=".csv" onChange={handleCSVUpload} />
        {batchResults.length > 0 && (
          <>
            <div className="chart-section">
              <Line data={chartData} />
            </div>
            <div className="table-section">
              <table>
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Time Gap</th>
                    <th>Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  {batchResults.map((row, index) => (
                    <tr key={index}>
                      <td>${row.amt}</td>
                      <td>{row.gap} min</td>
                      <td>
                        <span
                          className={`badge ${
                            row.prediction === "Fraud" ? "fraud" : "normal"
                          }`}
                        >
                          {row.prediction}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

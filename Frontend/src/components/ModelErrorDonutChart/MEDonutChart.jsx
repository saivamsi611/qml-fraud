import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./MEDonutChart.css";

export default function DonutChart({ accuracy }) {
  const error = 100 - accuracy;

  const data = {
    labels: ["Model Accuracy", "Error"],
    datasets: [
      {
        data: [accuracy, error],
        backgroundColor: ["#4CAF50", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: { legend: { display: false } },
  };

  return (
    <div className="donut-box">
      <h3>Model Accuracy Representation</h3>
      <div className="donut-chart">
        <Doughnut data={data} options={options} />
        <div className="donut-center">{accuracy}%</div>
      </div>
    </div>
  );
}

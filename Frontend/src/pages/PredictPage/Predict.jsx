    import React, { useState, useEffect, useRef } from "react";
    import axios from "axios";
    import { Link } from "react-router-dom";
    import "./Predict.css";

    function PredictPage() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [csvFile, setCsvFile] = useState(null);
    const [predictionResults, setPredictionResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        // Fetch projects on initial load
        axios
        .get("http://localhost:8080/projects")
        .then((res) => setProjects(res.data.projects))
        .catch((err) => console.error("Failed to fetch projects", err));
    }, []);

    const handleFileChange = (e) => setCsvFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProject || !csvFile) {
        alert("Please select a project and upload a CSV file.");
        return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("project_name", selectedProject);
        formData.append("file", csvFile);

        try {
        const res = await axios.post(
            "http://localhost:8080/upload_and_predict",
            formData,
            {
            headers: { "Content-Type": "multipart/form-data" },
            }
        );
        setPredictionResults(res.data);
        } catch (error) {
        console.error("Prediction failed", error);
        alert(
            error.response?.data?.message || "Prediction failed. See console for details."
        );
        } finally {
        setLoading(false);
        }
    };

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (
            sidebarOpen &&
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target) &&
            !event.target.closest(".hamburger")
        ) {
            setSidebarOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [sidebarOpen]);

    return (
        <div className={`predict-app ${sidebarOpen ? "sidebar-open" : ""}`}>
        <header className="topbar">
            <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            >
            ☰
            </button>
            <h1>Fraud Detection - Predict</h1>
        </header>

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} ref={sidebarRef}>
            <div className="menu-top">
            <ul>
                <li><Link to="/main">Home</Link></li>
                <li><Link to="/main/dashboard">Dashboard</Link></li>
            </ul>
            <hr />
            <ul>
                <li><Link to="/main/reportsAndAnalytics">Reports & Analytics</Link></li>
                <li><Link to="/main/transactions">Transactions</Link></li>
            </ul>
            <ul>
                <li><Link to="/main/predict">Predict</Link></li>
            </ul>
            <hr />
            <ul>
                <li><Link to="/main/settings">Settings</Link></li>
                <li><Link to="/main/help">Help</Link></li>
            </ul>
            <hr />
            </div>

            <div className="menu-bottom">
            <ul>
                <li><Link to="/About">About Us</Link></li>
                <li><Link to="/">Logout</Link></li>
            </ul>
            </div>
        </aside>

        <main className="predict-container">
            <h2>🔍 Predict Using Trained Model (Batch via CSV)</h2>
            <form onSubmit={handleSubmit} className="predict-form">
            <label htmlFor="project-select">Select Project:</label>
            <select
                id="project-select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
            >
                <option value="">-- Choose a project --</option>
                {projects.map((project) => (
                <option key={project.id} value={project.project_name}>
                    {project.project_name}
                </option>
                ))}
            </select>

            <label htmlFor="csv-upload">Upload CSV with Samples:</label>
            <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Predicting..." : "Predict CSV"}
            </button>
            </form>

            {loading && (
            <div className="loading-spinner">
                <p>Loading...</p>
            </div>
            )}

            {predictionResults && (
            <div className="prediction-result">
                <h3>🧾 Prediction Results:</h3>
                {predictionResults.status === "success" ? (
                <table>
                    <thead>
                    <tr>
                        <th>Row</th>
                        <th>Features</th>
                        <th>Prediction Score</th>
                        <th>Label</th>
                        <th>Error</th>
                    </tr>
                    </thead>
                    <tbody>
                    {predictionResults.predictions.map((pred, idx) => (
                        <tr key={idx}>
                        <td>{pred.row ?? "-"}</td>
                        <td>{pred.features ? pred.features.join(", ") : "-"}</td>
                        <td>
                            {typeof pred.prediction === "number"
                            ? pred.prediction.toFixed(4)
                            : "-"}
                        </td>
                        <td>{pred.label !== undefined ? pred.label : "-"}</td>
                        <td>{pred.error ?? "-"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                ) : (
                <p>Error: {predictionResults.message}</p>
                )}
            </div>
            )}
        </main>
        </div>
    );
    }

    export default PredictPage;

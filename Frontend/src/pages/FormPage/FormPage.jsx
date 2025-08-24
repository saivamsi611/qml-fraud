import React, { useState, useEffect } from "react";
import "./FormPage.css";
import Globe from "../../components/Globe";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FormPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    file: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // Retrieve project name from localStorage on mount
  useEffect(() => {
    const currentProject = localStorage.getItem("currentProject") || "";
    setFormData((prev) => ({ ...prev, name: currentProject }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (file) => {
    if (file && file.type === "text/csv") {
      setFormData({ ...formData, file });
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert("Please upload a CSV file.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("projectName", formData.name);
    formDataToSend.append("fileName", formData.file.name);
    formDataToSend.append("file", formData.file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formDataToSend
      );

      if (response.status === 200) {
        alert("CSV uploaded successfully!");
        navigate("/main"); // redirect to main page
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formpage-wrapper">
      <Globe className="globe-background" />

      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay">
          <h2>Loading...</h2>
        </div>
      )}

      {/* Form container */}
      <div className="form-container">
        <h2>Upload CSV Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter project name"
            required
          />

          <label>Upload CSV</label>
          <div
            className={`drop-zone ${dragActive ? "active" : ""}`}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input").click()}
          >
            <p>Drag & drop your CSV file here or click below</p>
            <input
              id="file-input"
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>

          {formData.file && <p className="file-name">📂 {formData.file.name}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

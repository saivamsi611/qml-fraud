import React, { useState } from "react";
import "./FormPage.css";
import Globe from "../../components/Globe";

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    file: null,
  });
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (file) => {
    if (file && file.type === "text/csv") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        file: file, // Replaces previous file
      }));
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]); // Only processes the first file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert("Please upload a CSV file.");
      return;
    }
    const projectName = formData.name;
    const fileName = formData.file.name;
    const timestamp = new Date().toISOString();
    const tupleData = [projectName, fileName, timestamp];

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: tupleData }),
      });
      if (response.ok) alert("CSV metadata sent successfully!");
      else alert("Failed to send data to backend.");
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend.");
    }
  };

  return (
    <div className="formpage-wrapper">
      <Globe className="globe-background" />
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
            onClick={() => document.getElementById("file-input").click()} // Click to open file picker
          >
            <p>Drag & drop your CSV file here or click below</p>
            <input
              id="file-input"
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e.target.files[0])} // Only first file
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
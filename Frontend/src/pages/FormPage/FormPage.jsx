import React, { useState, useEffect, useRef } from "react";
import "./FormPage.css";
import Globe from "../../components/Globe";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", file: null });
  const [dragActive, setDragActive] = useState(false);

  // Upload dialog states
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("Calculating...");
  const [uploadStartTime, setUploadStartTime] = useState(null);
  const cancelTokenSource = useRef(null);

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
    const validTypes = ["text/csv", "application/vnd.ms-excel"];
    const isCSV = file && (validTypes.includes(file.type) || file.name.endsWith(".csv"));
    if (isCSV) {
      setFormData({ ...formData, file });
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file || !formData.name) {
      alert("Please provide both project name and CSV file.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("projectName", formData.name);
    formDataToSend.append("fileName", formData.file.name);
    formDataToSend.append("file", formData.file);

    setUploading(true);
    setProgress(0);
    setUploadStartTime(Date.now());

    cancelTokenSource.current = axios.CancelToken.source();

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload_csv", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        cancelToken: cancelTokenSource.current.token,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);

            const elapsedTime = (Date.now() - uploadStartTime) / 1000; // seconds
            const uploadRate = progressEvent.loaded / elapsedTime; // bytes/sec
            const remainingBytes = progressEvent.total - progressEvent.loaded;
            const estTime = remainingBytes / uploadRate;
            setTimeRemaining(`${Math.ceil(estTime)}s remaining`);
          }
        },
      });

      setUploading(false);
      if (response.status === 200) {
        alert("✅ CSV uploaded successfully!");
        navigate("/main"); // redirect on success
      }
    } catch (error) {
      setUploading(false);
      if (axios.isCancel(error)) {
        alert("❌ Upload canceled.");
      } else {
        alert("🚨 Upload failed. Check backend.");
      }
    }
  };

  const handleCancelUpload = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Upload canceled by user.");
      setUploading(false);
    }
  };

  return (
    <div className={`formpage-wrapper ${uploading ? "blurred" : ""}`}>
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
            onDragEnter={handleDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input").click()}
          >
            <p>Drag & drop your CSV file here or click below</p>
            <input
              id="file-input"
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>

          {formData.file && <p className="file-name">📂 {formData.file.name}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>

      {uploading && (
        <div className="upload-dialog">
          <h3>Uploading...</h3>
          <p><strong>File:</strong> {formData.file?.name}</p>
          <p><strong>Size:</strong> {(formData.file.size / (1024 * 1024)).toFixed(2)} MB</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{progress}% - {timeRemaining}</p>
          <button className="cancel-btn" onClick={handleCancelUpload}>Cancel</button>
        </div>
      )}
    </div>
  );
}

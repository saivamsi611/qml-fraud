import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import Globe from "../../components/Globe";

// ✅ Import default profile image from local assets
import defaultProfileImg from "../../../Static/profilepic.webp";

export default function Settings() {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  // User state including profile image
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
    newPassword: "",
    confirmPassword: "",
    profileImg: null,
  });

  const [previewImg, setPreviewImg] = useState(null);

  // Handle input change for text/password fields
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle profile image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profileImg: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile update form submit
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // TODO: Upload profileImg and update backend
  };

  // Password change form submit
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (user.newPassword !== user.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    alert("Password updated successfully!");
    // TODO: call backend API
  };

  return (
    <>
      <div ref={mountRef} className="globe-background">
        <Globe />
      </div>
      <main className="settings-page glassmorphism">
        <button className="btn back-home" onClick={() => navigate("/main")}>
          ← Back to Home
        </button>

        <h1>Settings</h1>

        <section className="settings-section profile-section">
          <h2>Profile Information</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="profile-image-wrapper">
              <img
                src={previewImg || defaultProfileImg} // ✅ Using local image as fallback
                className="profile-image"
                alt="Profile"
                height={150}
                width={150}
              />
              <label htmlFor="profileImg" className="upload-label">
                Upload Image
              </label>
              <input
                id="profileImg"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn">
              Update Profile
            </button>
          </form>
        </section>

        <section className="settings-section">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Current Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={user.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn">
              Change Password
            </button>
          </form>
        </section>

        <section className="settings-section danger-zone">
          <h2>Danger Zone</h2>
          <button
            className="btn danger"
            onClick={() => alert("Account deletion requested!")}
          >
            Delete Account
          </button>
        </section>
      </main>
    </>
  );
}

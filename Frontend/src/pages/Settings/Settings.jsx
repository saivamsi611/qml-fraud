import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Settings.css";
import Globe from "../../components/Globe";
import defaultProfileImg from "../../../Static/profilepic.webp";

export default function Settings() {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
    newPassword: "",
    confirmPassword: "",
    profileImg: null,
  });

  const [previewImg, setPreviewImg] = useState(null);

  // ✅ Processing dialog state
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profileImg: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // show dialog
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      if (user.profileImg) formData.append("profileImg", user.profileImg);

      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(res.data.message || "Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile!");
    } finally {
      setIsProcessing(false); // hide dialog
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (user.newPassword !== user.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/change-password",
        {
          email: user.email,
          currentPassword: user.password,
          newPassword: user.newPassword,
        }
      );
      alert(res.data.message || "Password updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating password!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    setIsProcessing(true);
    try {
      const res = await axios.delete("http://localhost:5000/api/user/delete", {
        data: { email: user.email },
      });
      alert(res.data.message || "Account deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error deleting account!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div ref={mountRef} className="globe-background">
        <Globe />
      </div>

      {/* ✅ Processing Dialog */}
      {isProcessing && (
        <div className="processing-dialog">
          <div className="processing-content">
            <p>⏳ Processing...</p>
          </div>
        </div>
      )}

      <main className="settings-page glassmorphism">
        <button className="btn back-home" onClick={() => navigate("/main")}>
          ← Back to Home
        </button>

        <h1>Settings</h1>

        {/* Profile Section */}
        <section className="settings-section profile-section">
          <h2>Profile Information</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="profile-image-wrapper">
              <img
                src={previewImg || defaultProfileImg}
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
              <input type="text" name="name" value={user.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={user.email} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn">Update Profile</button>
          </form>
        </section>

        {/* Password Section */}
        <section className="settings-section">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Current Password:</label>
              <input type="password" name="password" value={user.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input type="password" name="newPassword" value={user.newPassword} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm New Password:</label>
              <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn">Change Password</button>
          </form>
        </section>

        {/* Danger Zone */}
        <section className="settings-section danger-zone">
          <h2>Danger Zone</h2>
          <button className="btn danger" onClick={handleDeleteAccount}>Delete Account</button>
        </section>
      </main>
    </>
  );
}

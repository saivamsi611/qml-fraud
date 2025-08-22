import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useNavigate } from "react-router-dom"; // for navigation
import "./Settings.css";

export default function Settings() {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  // Three.js globe setup (same as before)
  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent bg
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const geometry = new THREE.SphereGeometry(1, 64, 64);

    const vertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
        vec3 glow = vec3(0.2, 0.7, 1.0) * intensity;
        gl_FragColor = vec4(glow, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
      transparent: true,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00aaff, 1.2);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    const handleResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      controls.dispose();
    };
  }, []);

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
      <div ref={mountRef} className="globe-background"></div>
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
                src={
                  previewImg
                    ? previewImg
                    : "https://via.placeholder.com/120?text=Profile"
                }
                alt="Profile Preview"
                className="profile-image"
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

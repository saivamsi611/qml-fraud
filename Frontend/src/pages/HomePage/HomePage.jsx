import React, { useRef, useEffect, useState } from "react";
import QuantumLoader from "../../components/QuantumLoader";
import usePageLoader from "../../hooks/usePageLoader";
import Globe from "../../components/Globe"; 
import Header from "../../components/Header/Header";
import "../../index.css";
import "./HomePage.css";
import gsap from "gsap";
import axios from "axios"; // ✅ Import axios

export default function HomePage() {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  // ✅ State for backend data
  const [backendMessage, setBackendMessage] = useState("");

  // Smart loading - only runs once per session, tracks assets
  const { isLoading, loadingMessage, loadingProgress } = usePageLoader("homepage", {
    minLoadTime: 2000,
    checkImages: true,
    checkFonts: true,
    customAssets: [
      { type: "image", src: "/your-hero-image.jpg", name: "Hero Image" }
    ]
  });

  useEffect(() => {
    if (!isLoading) {
      // Animate Hero Section
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.9,
        ease: "power3.out"
      });

      // Animate Gallery Cards with Stagger
      gsap.from(galleryRef.current.children, {
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(galleryRef.current.children, { clearProps: "transform" });
        }
      });

      // ✅ Fetch data from backend
      axios.get("http://localhost:5000/api/home") // Change URL to your backend
        .then((res) => {
          setBackendMessage(res.data.message || "Connected to backend ✅");
        })
        .catch((err) => {
          console.error("Backend error:", err);
          setBackendMessage("⚠️ Failed to fetch backend data");
        });
    }
  }, [isLoading]);

  return (
    <>
      {/* Quantum Loader with progress */}
      <QuantumLoader 
        isLoading={isLoading} 
        message={loadingMessage}
        progress={loadingProgress}
      />

      {/* Main Content (only visible after loader) */}
      {!isLoading && (
        <div className="app-background">
          {/* 🌍 Background Globe */}
          <Globe />

          {/* HEADER */}
          <Header />

          {/* HERO SECTION */}
          <main className="container">
            <section ref={heroRef} className="hero-section glass-card">
              <h1>💳 QML Fraud Detection</h1>
              <p>
                Welcome to <strong>QML Fraud Detection</strong>, a modern platform
                that leverages quantum-inspired machine learning to detect and
                prevent fraudulent transactions in real time.
              </p>
              <p>
                Our system provides advanced fraud detection tools, insightful
                analytics, and secure transaction monitoring — designed for
                businesses and individuals who value trust and security.
              </p>

              {/* ✅ Show backend message */}
              {backendMessage && (
                <p className="backend-message">
                  🔗 {backendMessage}
                </p>
              )}
            </section>

            {/* ABOUT / FEATURES */}
            <section ref={galleryRef} className="usage-gallery">
              <div className="usage-card">
                <span className="usage-icon">⚡</span>
                <h4>Real-Time Detection</h4>
                <p>
                  Instantly identify suspicious transactions using advanced ML algorithms.
                </p>
              </div>

              <div className="usage-card">
                <span className="usage-icon">📊</span>
                <h4>Analytics & Insights</h4>
                <p>
                  Gain valuable insights with visual reports and fraud trend analysis.
                </p>
              </div>

              <div className="usage-card">
                <span className="usage-icon">🔒</span>
                <h4>Secure & Reliable</h4>
                <p>
                  Built with security in mind to protect your data and transactions.
                </p>
              </div>

              <div className="usage-card">
                <span className="usage-icon">🌍</span>
                <h4>Global Reach</h4>
                <p>
                  Monitor and detect fraud across multiple regions and transaction types.
                </p>
              </div>
            </section>
          </main>

          {/* FOOTER */}
          <footer className="footer">
            © 2025 QML Fraud Detection. All rights reserved.
          </footer>
        </div>
      )}
    </>
  );
}

import { Outlet, Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import "./styles.css";

export default function Layout() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x00e5ff,
        backgroundColor: 0x050914,
        points: 14.0,
        maxDistance: 22.0,
        spacing: 17.0,
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div className="layout">
      {/* Vanta Background */}
      <div ref={vantaRef} className="vanta-layer"></div>

      {/* Foreground */}
      <header className="header">
        <div className="logo">💳 QML Fraud Detection</div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="footer">
        © 2025 QML Fraud Detection. All rights reserved.
      </footer>
    </div>
  );
}

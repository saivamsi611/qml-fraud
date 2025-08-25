// components/LinearLoader.jsx
import React from "react";
import "./LinearLoader.css";

export default function LinearLoader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="linear-loader">
      <div className="bar" />
    </div>
  );
}

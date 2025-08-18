import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "../src/pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/main" element={<MainPage/>} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;

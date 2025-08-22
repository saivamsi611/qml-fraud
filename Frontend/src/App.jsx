import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import SignupPage from "./pages/SingupPage/SingupPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import ReportsAndAnalyticsPage from "./pages/ReportsAndAnalyticsPage/ReportsAndAnalyticsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/Forgotpassword" element={<ForgotPassword />} />
      <Route path="/main" element={<MainPage/>} />
      <Route path="/main/dashboard" element={<Dashboard />} />
      <Route path="/main/ReportsAndAnalytics" element={<ReportsAndAnalyticsPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;

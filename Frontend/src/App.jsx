import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import SignupPage from "./pages/SingupPage/SingupPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/AboutPage/About";
import ReportsAndAnalytics from "./pages/ReportsAndAnalyticsPage/ReportsAndAnalyticsPage";
import Settings from './pages/Settings/Settings';
import Helpus from './pages/HelpusPage/Helpus'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/Forgotpassword" element={<ForgotPassword />} />
      <Route path="/About" element={<About />} />
      <Route path="/main" element={<MainPage/>} />
      <Route path="/main/dashboard" element={<Dashboard />} />
      <Route path="/main/ReportsAndAnalytics" element={<ReportsAndAnalytics />} />
      <Route path="/main/settings" element={<Settings />} />
      <Route path="/main/help" element={<Helpus />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;

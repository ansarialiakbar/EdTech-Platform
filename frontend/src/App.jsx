import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundSlider from "./components/BackgroundSlider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ApplicationTracking from "./pages/ApplicationTracking";
import ScholarshipFinder from "./pages/ScholarshipFinder";
import AIProfileMatcher from "./pages/AIProfileMatcher";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative min-h-screen">
          <BackgroundSlider />  {/* ✅ Background images will animate */}
          <Navbar />
          <div className="relative z-10 flex flex-col min-h-screen pt-16"> {/* ✅ Prevents overlap */}
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private Routes */}
                <Route path="/dashboard" element={<PrivateRoute allowedRoles={["student", "agent", "admin"]}><Dashboard /></PrivateRoute>} />
                <Route path="/applications" element={<PrivateRoute allowedRoles={["student", "agent", "admin"]}><ApplicationTracking /></PrivateRoute>} />
                <Route path="/scholarships" element={<PrivateRoute allowedRoles={["student"]}><ScholarshipFinder /></PrivateRoute>} />
                <Route path="/profile-matcher" element={<PrivateRoute allowedRoles={["student"]}><AIProfileMatcher /></PrivateRoute>} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

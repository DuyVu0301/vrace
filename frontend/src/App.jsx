import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/Home.jsx"; // Trang danh sách giải đấu
import DashboardPage from "./pages/DashboardPage.jsx"; // Trang thống kê cá nhân
import RaceDetailPage from "./pages/RaceDetail.jsx"; // Trang chi tiết giải & Leaderboard
import AdminPage from "./pages/AdminPage.jsx";
import "tailwindcss";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Routes - Dành cho vận động viên */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/race/:id"
          element={
            <ProtectedRoute>
              <RaceDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes - Dành cho ban tổ chức */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Điều hướng mặc định */}
        {/* Nếu đã login sẽ vào /home (Danh sách giải), nếu chưa sẽ bị ProtectedRoute đẩy về login */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* 404 - Có thể bổ sung thêm trang NotFound nếu cần */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;

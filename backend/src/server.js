import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import raceRoutes from "./routes/raceRoutes.js";
import stravaRoutes from "./routes/stravaRoutes.js"; // Route mới
import userRoutes from "./routes/userRoutes.js"; // Route mới cho stats/profile
import { authMiddleware, checkRole } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes công khai
app.use("/api/auth", authRoutes);
app.use("/api/races", raceRoutes);

// Routes cho Strava (Cần auth để biết liên kết với User nào)
app.use("/api/strava", stravaRoutes);

// Routes cho User (Profile, Statistics)
app.use("/api/users", userRoutes);

// Dashboard API (Đã có logic trong userRoutes, nhưng giữ lại endpoint này nếu bạn cần)
app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});

// Admin Panel API
app.get("/api/admin", authMiddleware, checkRole(["admin"]), (req, res) => {
  res.json({
    message: "Welcome to admin panel",
    user: req.user,
  });
});

// Xử lý lỗi tập trung (Error Handling)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Đã có lỗi xảy ra từ phía Server!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server FSS Race đang chạy tại port ${PORT}`);
});

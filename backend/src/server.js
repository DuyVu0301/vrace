import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { authMiddleware, checkRole } from "./middleware/authMiddleware.js";
import raceRoutes from "./routes/raceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/races", raceRoutes);

app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to dashboard", user: req.user });
});

app.get("/api/admin", authMiddleware, checkRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome to admin panel", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

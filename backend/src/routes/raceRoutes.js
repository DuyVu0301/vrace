import express from "express";
// Đổi 'protect' thành 'authMiddleware' ở dòng dưới đây
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllRaces,
  getRaceById,
  registerRace,
} from "../controllers/raceController.js";

const router = express.Router();

router.get("/", getAllRaces);
router.get("/:id", getRaceById);

// Cập nhật middleware ở các route cần bảo vệ
router.post("/register/:raceId", authMiddleware, registerRace);

export default router;

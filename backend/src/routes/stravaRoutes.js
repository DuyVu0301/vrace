import express from "express";
import { getAuthUrl, stravaCallback } from "../controllers/stravaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route lấy URL để User nhấn "Kết nối Strava"
// Cần authMiddleware để biết User nào đang thực hiện kết nối (lấy req.user.id)
router.get("/auth", authMiddleware, getAuthUrl);

// Route Strava gọi về sau khi User đồng ý
// Lưu ý: Callback này không cần middleware vì Strava gọi trực tiếp,
// ta sẽ định danh user qua tham số 'state' trong controller.
router.get("/callback", stravaCallback);

// Dùng export default để server.js có thể import stravaRoutes
export default router;

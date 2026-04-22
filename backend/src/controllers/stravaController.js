import axios from "axios";
import db from "../config/database.js"; // Đã sửa theo tên file của Vũ

// 1. Tạo URL để User nhấn vào và đi tới trang Authorize của Strava
export const getAuthUrl = (req, res) => {
  try {
    const scope = "read,activity:read_all";

    // Gửi userId qua tham số state để khi Strava quay lại mình biết là ai
    const state = req.user.id;

    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.STRAVA_REDIRECT_URI}&response_type=code&scope=${scope}&state=${state}`;

    res.json({ url: authUrl });
  } catch (error) {
    res.status(500).json({ message: "Không thể tạo URL kết nối Strava" });
  }
};

// 2. Xử lý Callback sau khi User nhấn "Cho phép" trên Strava
export const stravaCallback = async (req, res) => {
  const { code, state } = req.query;

  // state lúc này chính là userId mình đã gửi đi ở hàm getAuthUrl
  const userId = state;

  if (!code) {
    return res.redirect("http://localhost:5173/dashboard?strava=failed");
  }

  try {
    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    });

    const { access_token, refresh_token, expires_at, athlete } = response.data;

    // Lưu Token vào bảng users
    // Sử dụng await db.execute vì Vũ dùng mysql2/promise
    await db.execute(
      `UPDATE users SET 
        strava_id = ?, 
        strava_access_token = ?, 
        strava_refresh_token = ?, 
        strava_expires_at = ? 
      WHERE id = ?`,
      [athlete.id, access_token, refresh_token, expires_at, userId]
    );

    // Sau khi thành công, redirect về Frontend Dashboard
    res.redirect("http://localhost:5173/dashboard?strava=connected");
  } catch (error) {
    console.error("Lỗi OAuth Strava:", error.response?.data || error.message);
    res.redirect("http://localhost:5173/dashboard?strava=failed");
  }
};

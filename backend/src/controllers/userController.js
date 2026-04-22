import db from "../config/database.js";

// Lấy thống kê tổng quát của người dùng
export const getUserStats = async (req, res) => {
  const userId = req.user.id; // Lấy từ authMiddleware

  try {
    // 1. Lấy tổng quãng đường, số hoạt động từ bảng user_statistics
    const [stats] = await db.execute(
      "SELECT total_distance, total_activities, total_moving_time FROM user_statistics WHERE user_id = ?",
      [userId]
    );

    // 2. Lấy danh sách giải đấu đang tham gia và tiến độ
    const [registrations] = await db.execute(
      `SELECT r.title, reg.current_distance, r.distance_goal 
       FROM registrations reg 
       JOIN races r ON reg.race_id = r.id 
       WHERE reg.user_id = ?`,
      [userId]
    );

    res.json({
      summary: stats[0] || {
        total_distance: 0,
        total_activities: 0,
        total_moving_time: 0,
      },
      activeRaces: registrations,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ message: "Lỗi lấy dữ liệu thống kê người dùng" });
  }
};

const axios = require("axios");
const db = require("../config/db");

exports.syncUserActivities = async (userId) => {
  const [rows] = await db.execute(
    "SELECT strava_access_token FROM users WHERE id = ?",
    [userId]
  );
  const token = rows[0].strava_access_token;

  const response = await axios.get(
    "https://www.strava.com/api/v3/athlete/activities",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const activities = response.data; // Danh sách các buổi chạy

  for (let activity of activities) {
    if (activity.type === "Run") {
      // 1. Lưu vào bảng activities (dùng INSERT IGNORE để tránh trùng)
      await db.execute(
        `INSERT IGNORE INTO activities (user_id, strava_activity_id, name, distance, moving_time, start_date_local) 
                VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          activity.id,
          activity.name,
          activity.distance,
          activity.moving_time,
          activity.start_date_local,
        ]
      );

      // 2. Logic cộng dồn vào giải đấu (Nếu buổi chạy nằm trong thời gian giải)
      // Vũ sẽ viết thêm logic UPDATE bảng registrations ở đây
    }
  }
};

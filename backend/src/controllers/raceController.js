import pool from "../config/database.js";

// Lấy toàn bộ giải đấu
export const getAllRaces = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [races] = await connection.query(`
      SELECT r.*, COUNT(reg.id) as participants 
      FROM races r
      LEFT JOIN registrations reg ON r.id = reg.race_id
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `);
    res.json(races);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy danh sách giải đấu" });
  } finally {
    if (connection) connection.release();
  }
};

// Lấy chi tiết 1 giải đấu
export const getRaceById = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    connection = await pool.getConnection();
    const [race] = await connection.query("SELECT * FROM races WHERE id = ?", [
      id,
    ]);

    if (race.length === 0)
      return res.status(404).json({ message: "Không tìm thấy giải đấu" });

    res.json(race[0]);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  } finally {
    if (connection) connection.release();
  }
};

// Đăng ký tham gia giải đấu
export const registerRace = async (req, res) => {
  let connection;
  try {
    const { raceId } = req.params;
    const userId = req.user.userId; // Lấy từ authMiddleware (protect)

    connection = await pool.getConnection();

    // Kiểm tra xem đã đăng ký chưa
    const [check] = await connection.query(
      "SELECT id FROM registrations WHERE user_id = ? AND race_id = ?",
      [userId, raceId]
    );

    if (check.length > 0) {
      return res.status(400).json({ message: "Bạn đã đăng ký giải này rồi" });
    }

    await connection.query(
      "INSERT INTO registrations (user_id, race_id) VALUES (?, ?)",
      [userId, raceId]
    );

    res.status(201).json({ message: "Đăng ký tham gia thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đăng ký thất bại" });
  } finally {
    if (connection) connection.release();
  }
};

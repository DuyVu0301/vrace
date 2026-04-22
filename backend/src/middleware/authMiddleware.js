import jwt from "jsonwebtoken";

/**
 * Middleware xác thực người dùng qua JWT
 * Được gọi là authMiddleware để khớp với import trong server.js
 */
export const authMiddleware = async (req, res, next) => {
  let token;

  // Kiểm tra token trong Header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Lấy token từ chuỗi "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Giải mã token bằng Secret Key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      /**
       * Gán thông tin user vào request (req.user).
       * Lưu ý: Payload của JWT nên chứa id và role.
       */
      req.user = decoded;

      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res
        .status(401)
        .json({ message: "Phiên đăng nhập hết hạn hoặc token lỗi" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Bạn chưa đăng nhập, không có token" });
  }
};

/**
 * Middleware kiểm tra quyền hạn (Admin/User)
 * @param {string} role - Quyền cần kiểm tra (ví dụ: 'admin')
 */
export const checkRole = (role) => {
  return (req, res, next) => {
    // req.user được gán từ authMiddleware phía trên
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({
        message: `Bạn không có quyền truy cập. Yêu cầu quyền: ${role}`,
      });
    }
  };
};

import React, { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useRegistrations } from "../hooks/useRegistrations";
import { RaceCard } from "./RaceCard";
import StravaConnect from "./StravaConnect";

export const UserDashboard = () => {
  // 1. Lấy dữ liệu user từ store
  const user = useUserStore((state) => state.user);

  // 2. Lấy danh sách giải đấu đã đăng ký
  // Dùng optional chaining user?.id để không bị lỗi crash khi user đang null
  const { registrations = [], loading, error } = useRegistrations(user?.id);

  useEffect(() => {
    // Logic fetch dữ liệu bổ sung có thể thêm ở đây
  }, []);

  // 3. Xử lý trạng thái LOADING khi chưa có User (Tránh màn hình trắng)
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-900 font-semibold text-lg">
            Đang tải dữ liệu người dùng...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Vui lòng kiểm tra đăng nhập hoặc kết nối mạng
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Chào mừng, {user.name || user.username || "Vận động viên"}
              </h1>
              <p className="text-gray-600 mt-2">
                Theo dõi tiến độ chạy bộ và các giải đấu của bạn
              </p>
            </div>

            {/* Chỉ hiển thị StravaConnect nếu người dùng CHƯA có strava_id */}
            {!user.strava_id && <StravaConnect />}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Giải đấu bạn tham gia
          </h2>
          <p className="text-gray-600 font-medium">
            {loading
              ? "Đang cập nhật..."
              : `${registrations.length} giải đấu đang diễn ra`}
          </p>
        </div>

        {/* Thông báo lỗi nếu API registrations thất bại */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-800">
            Lỗi tải dữ liệu giải đấu: {error.message || "Đã có lỗi xảy ra"}
          </div>
        )}

        {/* 4. Hiển thị danh sách hoặc Skeleton Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl h-64 animate-pulse shadow-sm border border-gray-100"
              />
            ))}
          </div>
        ) : registrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {registrations.map((reg) => (
              <RaceCard key={reg.id} registration={reg} />
            ))}
          </div>
        ) : (
          /* Empty State khi chưa tham gia giải nào */
          <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center shadow-sm">
            <div className="mb-4 text-4xl">🏃‍♂️</div>
            <p className="text-gray-600 font-semibold mb-6">
              Bạn chưa đăng ký giải đấu nào
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:-translate-y-1">
              Khám phá các giải chạy ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";

export const RaceCard = ({ registration }) => {
  const navigate = useNavigate();

  if (!registration) return null;

  // Xóa 'status' khỏi danh sách bóc tách (destructuring) vì không dùng đến
  const { race, current_distance = 0 } = registration;

  const goal = race?.distance_goal || 1;
  const progress = Math.min(Math.round((current_distance / goal) * 100), 100);

  return (
    <div
      onClick={() => navigate(`/race/${race?.id}`)}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group"
    >
      {/* Ảnh giải chạy */}
      <div className="relative h-40 w-full mb-4 overflow-hidden rounded-2xl">
        <img
          src={race?.image_url || "https://via.placeholder.com/400x200"}
          alt={race?.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-navy-900 shadow-sm">
          {race?.category || "Marathon"}
        </div>
      </div>

      {/* Thông tin giải chạy */}
      <h3 className="text-lg font-extrabold text-navy-900 mb-2 line-clamp-1">
        {race?.title || "Giải chạy chưa đặt tên"}
      </h3>

      {/* Tiến độ (ProgressBar) */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Tiến độ</span>
          <span className="text-orange-500 font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-gray-400">
            <span className="font-bold text-gray-700">{current_distance}</span>{" "}
            / {goal} KM
          </div>
          {/* Dùng luôn biến progress để hiển thị trạng thái thay vì biến status cũ */}
          <span
            className={`text-[10px] uppercase font-black px-2 py-1 rounded ${
              progress === 100
                ? "bg-green-100 text-green-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {progress === 100 ? "Hoàn thành" : "Đang chạy"}
          </span>
        </div>
      </div>
    </div>
  );
};

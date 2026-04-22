import React from "react";

const StravaConnect = () => {
  const handleConnect = () => {
    // Chuyển hướng đến luồng OAuth của Strava thông qua Backend
    const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    window.location.href = `${backendUrl}/api/strava/auth`;
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-3xl border-2 border-dashed border-gray-200 hover:border-orange-300 transition-all group">
      {/* Icon trang trí */}
      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <svg
          className="w-10 h-10 text-[#FC4C02]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2">
        Đồng bộ dữ liệu Strava
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-[250px] mb-6">
        Kết nối ngay để tự động ghi nhận quãng đường và cập nhật bảng xếp hạng
        giải đấu.
      </p>

      {/* Nút bấm chính */}
      <button
        onClick={handleConnect}
        className="flex items-center gap-3 px-8 py-3 bg-[#FC4C02] text-white font-black rounded-xl hover:bg-[#e34402] transition-all shadow-lg shadow-orange-100 active:scale-95"
      >
        <span className="text-xl">🧡</span>
        KẾT NỐI VỚI STRAVA
      </button>
    </div>
  );
};

export default StravaConnect;

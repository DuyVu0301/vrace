import React from "react";
import { useAuthStore } from "../store/authStore";
import { UserStatsCard } from "../components/UserStatsCard";
import StravaConnect from "../components/StravaConnect";

const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 text-indigo-900">
            Chào mừng, {user?.username}!
          </h1>
          <p className="text-gray-500">Hôm nay bạn sẽ chạy bao nhiêu km?</p>
        </div>
        {!user?.strava_id && <StravaConnect />}
      </div>

      {/* Sử dụng UserStatsCard mới tạo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <UserStatsCard
          label="Tổng quãng đường"
          value="125.4"
          unit="km"
          icon="🏃‍♂️"
          colorClass="text-orange-500 bg-orange-500"
        />
        <UserStatsCard
          label="Số giải đã xong"
          value="3"
          unit="giải"
          icon="🏆"
          colorClass="text-blue-600 bg-blue-600"
        />
        <UserStatsCard
          label="Pace trung bình"
          value="6:45"
          unit="min/km"
          icon="⚡"
          colorClass="text-green-500 bg-green-500"
        />
        <UserStatsCard
          label="Calo tiêu thụ"
          value="4,200"
          unit="kcal"
          icon="🔥"
          colorClass="text-red-500 bg-red-500"
        />
      </div>

      <h2 className="text-2xl font-bold mb-6">Giải đấu bạn tham gia</h2>
      <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
        <p className="text-gray-400 italic">Bạn chưa đăng ký giải đấu nào.</p>
      </div>
    </div>
  );
};

export default DashboardPage;

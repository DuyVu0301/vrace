import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RaceDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info"); // info hoặc leaderboard
  const [race, setRace] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        setLoading(true);
        // Gọi API lấy thông tin chi tiết giải đấu
        const raceRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/races/${id}`
        );
        setRace(raceRes.data);

        // Gọi API lấy bảng xếp hạng của giải đấu này
        const lbRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/races/${id}/leaderboard`
        );
        setLeaderboard(lbRes.data);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu giải đấu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!race) {
    return (
      <div className="text-center py-20 text-gray-500">
        Không tìm thấy thông tin giải đấu.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      {/* Banner giải đấu */}
      <div className="relative group">
        <img
          src={race.image_url || "https://via.placeholder.com/1000x400"}
          className="w-full h-64 md:h-96 object-cover rounded-3xl mb-8 shadow-lg transition-transform duration-500"
          alt={race.title}
        />
        <div className="absolute bottom-12 left-8 bg-black bg-opacity-50 text-white p-4 rounded-xl backdrop-blur-sm">
          <p className="text-sm font-medium uppercase tracking-widest text-orange-400">
            Marathon Event
          </p>
          <h1 className="text-3xl font-black">{race.title}</h1>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("info")}
          className={`py-4 px-8 font-bold text-lg transition-all ${
            activeTab === "info"
              ? "border-b-4 border-orange-500 text-orange-500"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Thông tin giải đấu
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`py-4 px-8 font-bold text-lg transition-all ${
            activeTab === "leaderboard"
              ? "border-b-4 border-orange-500 text-orange-500"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Bảng xếp hạng
        </button>
      </div>

      {/* Content Section */}
      {activeTab === "info" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 leading-relaxed text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 underline decoration-orange-500 decoration-4">
              Giới thiệu giải đấu
            </h2>
            <div className="prose max-w-none">
              {race.description || "Chưa có mô tả chi tiết cho giải đấu này."}
            </div>
          </div>

          {/* Sidebar thông số nhanh */}
          <div className="bg-navy-900 text-white p-8 rounded-3xl shadow-xl h-fit">
            <h3 className="font-bold text-xl mb-6 border-b border-navy-700 pb-2">
              Thông tin
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-navy-300 text-xs uppercase font-bold">
                  Mục tiêu
                </p>
                <p className="text-xl font-black">{race.distance_goal} KM</p>
              </div>
              <div>
                <p className="text-navy-300 text-xs uppercase font-bold">
                  Thời gian
                </p>
                <p className="font-semibold">
                  {new Date(race.start_date).toLocaleDateString("vi-VN")} -{" "}
                  {new Date(race.end_date).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all mt-4 active:scale-95 shadow-lg shadow-orange-900/20">
                ĐĂNG KÝ NGAY
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-3xl shadow-sm border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 uppercase text-xs font-bold text-gray-500">
              <tr>
                <th className="p-6">Hạng</th>
                <th className="p-6">Vận động viên</th>
                <th className="p-6">Quãng đường</th>
                <th className="p-6">Hoàn thành</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaderboard.length > 0 ? (
                leaderboard.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <td className="p-6 font-black text-orange-500 text-xl">
                      #{index + 1}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 uppercase">
                          {item.username?.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-800">
                          {item.username}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 font-semibold">
                      {item.total_distance?.toFixed(2)} km
                    </td>
                    <td className="p-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.progress >= 100
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {item.progress || 0}%
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-10 text-center text-gray-400 italic"
                  >
                    Chưa có dữ liệu xếp hạng.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RaceDetail;

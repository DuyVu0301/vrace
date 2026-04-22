import React, { useEffect, useState } from "react";
import axios from "axios";
import { RaceCard } from "../components/RaceCard";

const Home = () => {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/races`);
        setRaces(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách giải:", err);
      }
    };
    fetchRaces();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-navy-900 py-16 px-6 text-center text-white bg-gradient-to-r from-blue-900 to-indigo-800">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider">
          FSS Race - Chinh phục giới hạn
        </h1>
        <p className="text-lg text-blue-200 max-w-2xl mx-auto">
          Tham gia các giải chạy bộ trực tuyến, kết nối dữ liệu từ Strava và
          nhận những phần quà hấp dẫn.
        </p>
      </div>

      {/* Race List */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
            Giải đấu đang diễn ra
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {races.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

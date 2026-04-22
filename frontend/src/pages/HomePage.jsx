import React, { useState, useEffect } from "react";
import { Bell, User, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import useAuthStore from "../store/authStore";

const HomePage = () => {
  const { user } = useAuthStore();
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const racesPerPage = 6;

  // 1. Lấy dữ liệu giải đấu từ Backend
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const res = await axiosInstance.get("/races");
        setRaces(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách giải đấu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRaces();
  }, []);

  // 2. Xử lý Đăng ký tham gia
  const handleRegister = async (raceId) => {
    if (!user) {
      alert("Vui lòng đăng nhập để tham gia giải chạy!");
      return;
    }
    try {
      const res = await axiosInstance.post(`/races/register/${raceId}`);
      alert(res.data.message);
      // Cập nhật lại số người tham gia tại chỗ mà không cần reload trang
      setRaces(
        races.map((r) =>
          r.id === raceId
            ? { ...r, participants: parseInt(r.participants) + 1 }
            : r
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  // Logic phân trang
  const indexOfLastRace = currentPage * racesPerPage;
  const indexOfFirstRace = indexOfLastRace - racesPerPage;
  const currentRaces = races.slice(indexOfFirstRace, indexOfLastRace);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-black text-blue-800 tracking-tighter cursor-pointer">
              FSSRACE
            </h1>
            <nav className="hidden md:flex space-x-6 font-semibold text-sm text-gray-600">
              <a
                href="/"
                className="text-blue-600 border-b-2 border-blue-600 pb-1"
              >
                Trang chủ
              </a>
              <a href="#races" className="hover:text-blue-600 transition">
                Giải đấu
              </a>
              <a href="#news" className="hover:text-blue-600 transition">
                Tin tức
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-5">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-2 p-1 pr-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition">
              <div className="bg-blue-600 p-1.5 rounded-full text-white">
                <User size={18} />
              </div>
              <span className="text-sm font-bold">
                {user?.username || "Khách"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN BANNER */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative group overflow-hidden rounded-2xl shadow-lg flex flex-col md:flex-row bg-white border border-gray-100">
          <div className="md:w-1/2 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1530143311094-34d807799e8f?q=80&w=1000"
              className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700"
              alt="Main Event"
            />
          </div>
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <span className="text-pink-500 font-bold text-xs uppercase mb-2">
              🎁 Giải đấu tiêu biểu
            </span>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
              FSS Race 2026 - Vươn tầm công nghệ
            </h2>
            <div className="space-y-3 text-sm text-gray-500 mb-8">
              <p>📅 Thời gian: Tiếp nhận đăng ký ngay hôm nay</p>
              <p>👥 Tham gia cùng hàng ngàn vận động viên trên toàn quốc</p>
              <p className="line-clamp-3 italic">
                Hành trình chinh phục những cung đường ảo nhưng giá trị thật.
                Kết nối Strava và bứt phá giới hạn bản thân ngay hôm nay.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-blue-700 underline">
                Miễn phí tham gia
              </span>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOẠT ĐỘNG CỘNG ĐỒNG */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center text-white text-xl font-bold mb-8 uppercase tracking-widest">
            Hoạt động của cộng đồng FSSRACE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            <div className="bg-cyan-500 p-6 rounded-md flex items-center justify-between text-white shadow-xl">
              <span className="text-3xl font-bold">3.291</span>
              <div className="text-right">
                <p className="text-[10px] font-bold opacity-80 uppercase">
                  HĐ trong ngày
                </p>
              </div>
            </div>
            <div className="bg-cyan-600 p-6 rounded-md flex items-center justify-between text-white shadow-xl">
              <span className="text-3xl font-bold">74.904</span>
              <div className="text-right">
                <p className="text-[10px] font-bold opacity-80 uppercase">
                  Tổng KM
                </p>
              </div>
            </div>
            <div className="bg-cyan-700 p-6 rounded-md flex items-center justify-between text-white shadow-xl">
              <span className="text-3xl font-bold">1.532</span>
              <div className="text-right">
                <p className="text-[10px] font-bold opacity-80 uppercase">
                  Tổng VĐV
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TẤT CẢ GIẢI ĐẤU */}
      <section id="races" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-black uppercase text-gray-800 border-l-4 border-blue-600 pl-4">
            Tất cả giải đấu
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRaces.map((race) => (
              <div
                key={race.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={
                      race.image_url || "https://via.placeholder.com/400x250"
                    }
                    className="w-full h-48 object-cover"
                    alt={race.title}
                  />
                  <span
                    className={`absolute top-3 left-3 text-[10px] px-2 py-1 rounded font-bold uppercase text-white ${
                      race.status === "active"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}
                  >
                    {race.status === "active" ? "Đang diễn ra" : "Sắp diễn ra"}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-lg leading-tight h-14 line-clamp-2 text-gray-800">
                    {race.title}
                  </h4>
                  <div className="text-xs text-gray-500 space-y-2 mt-3">
                    <p className="flex items-center">
                      <span className="mr-2">📅</span>{" "}
                      {new Date(race.start_date).toLocaleDateString("vi-VN")}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">👥</span> {race.participants || 0}{" "}
                      người tham gia
                    </p>
                  </div>
                  <button
                    onClick={() => handleRegister(race.id)}
                    className="w-full mt-5 py-2.5 bg-blue-50 text-blue-700 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-blue-100"
                  >
                    Đăng ký tham gia
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Phân trang */}
        {!loading && races.length > racesPerPage && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 border rounded-full hover:bg-white transition shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-bold text-blue-600 px-4">
              Trang {currentPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(races.length / racesPerPage))
                )
              }
              className="p-2 border rounded-full hover:bg-white transition shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>

      {/* 5. SLOGAN */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 py-20 text-white text-center">
        <h2 className="text-5xl font-black tracking-widest uppercase italic mb-4">
          Active more - Race more
        </h2>
        <p className="text-blue-100 mb-8 font-semibold">
          "Mỗi bước chạy, một hành trình tương lai"
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
            className="h-10 cursor-pointer"
            alt="App Store"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            className="h-10 cursor-pointer"
            alt="Play Store"
          />
        </div>
      </section>

      {/* 6. TIN TỨC */}
      <section id="news" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black uppercase text-gray-800 mb-8 border-l-4 border-orange-500 pl-4">
          Tin tức nổi bật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex space-x-5 items-start group cursor-pointer bg-white p-3 rounded-xl hover:shadow-md transition"
            >
              <img
                src={`https://picsum.photos/seed/${item}/150/100`}
                className="w-32 h-24 object-cover rounded-lg shadow-sm"
                alt="news"
              />
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
                  Cộng đồng • Sự kiện
                </span>
                <h5 className="font-bold text-gray-800 group-hover:text-blue-600 transition mt-1 leading-snug">
                  VnExpress Marathon 2026: Những cung đường mới chờ đón chân
                  chạy
                </h5>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                  Cập nhật lịch thi đấu mới nhất và những thay đổi quan trọng về
                  quy trình đăng ký giải chạy trực tuyến...
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ĐƠN VỊ ĐỒNG HÀNH */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-100 text-center">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-10">
          Đơn vị đồng hành
        </h3>
        <div className="flex flex-wrap justify-center gap-10 grayscale opacity-40 font-black text-2xl text-gray-300 italic">
          Coming Soon...
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-2xl font-black mb-6 tracking-tighter text-blue-400">
              FSSRACE
            </h4>
            <p className="text-xs opacity-60 leading-loose">
              Hệ thống quản lý giải chạy marathon trực tuyến tích hợp Strava.
              Chân chạy ảo, nỗ lực thật.
            </p>
            <p className="text-[10px] mt-4 opacity-40 font-mono italic">
              Powered by STRAVA & FSS Team © 2026.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">
              Thông tin
            </h5>
            <ul className="text-sm space-y-3 opacity-70">
              <li className="hover:text-blue-400 cursor-pointer">
                Câu hỏi thường gặp
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Chính sách bảo mật
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Điều khoản sử dụng
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">
              Liên hệ
            </h5>
            <ul className="text-sm space-y-3 opacity-70">
              <li>Email: support@fssrace.com</li>
              <li>Hotline: 1900 xxxx</li>
            </ul>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">
              Theo dõi chúng tôi
            </h5>
            <div className="flex space-x-4 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl cursor-pointer hover:bg-blue-500">
                f
              </div>
            </div>
            <div className="bg-white p-2 rounded shadow-inner">
              <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-black text-[8px] font-bold">
                QR DOWNLOAD
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome, {user?.username}!
          </h2>
          <p className="text-gray-300 mb-4">
            You are logged in as a{" "}
            <span className="font-semibold text-blue-400">{user?.role}</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Profile</h3>
              <p className="text-gray-300">Email: {user?.email}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Stats</h3>
              <p className="text-gray-300">Account Status: Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

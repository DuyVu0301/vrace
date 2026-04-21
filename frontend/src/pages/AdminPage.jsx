import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-purple-800 border-b-4 border-purple-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-purple-200 text-sm">Management Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-purple-900 rounded-lg shadow-xl p-6 border-l-4 border-purple-500">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-white">--</p>
          </div>

          <div className="bg-purple-900 rounded-lg shadow-xl p-6 border-l-4 border-purple-500">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">
              Active Sessions
            </h3>
            <p className="text-3xl font-bold text-white">--</p>
          </div>

          <div className="bg-purple-900 rounded-lg shadow-xl p-6 border-l-4 border-purple-500">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">
              System Status
            </h3>
            <p className="text-3xl font-bold text-green-400">Online</p>
          </div>

          <div className="bg-purple-900 rounded-lg shadow-xl p-6 border-l-4 border-purple-500">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">
              Admin User
            </h3>
            <p className="text-white font-semibold">{user?.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              User Management
            </h2>
            <p className="text-gray-400 mb-4">
              Manage user accounts and permissions
            </p>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition">
              View Users
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              System Settings
            </h2>
            <p className="text-gray-400 mb-4">
              Configure system parameters and security
            </p>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

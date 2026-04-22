import React, { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useRegistrations } from "../hooks/useRegistrations";
import { RaceCard } from "./RaceCard";
import { StravaConnectButton } from "./StravaConnectButton";

export const UserDashboard: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const { registrations, loading, error } = useRegistrations(user?.id);

  useEffect(() => {
    // Fetch user data on mount (replace with your actual user fetch logic)
    // useUserStore.getState().setUser({ id: '1', name: 'John Doe' });
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-navy-50">
        <div className="text-center">
          <p className="text-navy-900 font-semibold">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-navy-900">
                Welcome, {user.name}
              </h1>
              <p className="text-gray-600 mt-2">
                Track your race progress and connected accounts
              </p>
            </div>
            <StravaConnectButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Registered Races Section */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
              Your Registered Races
            </h2>
            <p className="text-gray-600">
              {registrations.length} race{registrations.length !== 1 ? "s" : ""}{" "}
              in progress
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-medium">
                Error loading races: {error}
              </p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg h-48 animate-pulse"
                />
              ))}
            </div>
          ) : registrations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registrations.map((registration) => (
                <RaceCard key={registration.id} registration={registration} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <p className="text-gray-600 font-medium mb-4">
                No races registered yet
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Browse Races
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

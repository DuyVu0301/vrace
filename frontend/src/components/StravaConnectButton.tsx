import React from "react";
import { useUserStore } from "../store/userStore";

export const StravaConnectButton: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const connectStrava = useUserStore((state) => state.connectStrava);

  const handleStravaConnect = () => {
    // Redirect to Strava OAuth flow
    window.location.href = `/api/auth/strava`;
  };

  const handleDisconnect = () => {
    connectStrava("");
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      {user.strava_id ? (
        <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-navy-900">
            Strava Linked
          </span>
          <span className="text-xs text-orange-600 font-mono">
            {user.strava_id}
          </span>
          <button
            onClick={handleDisconnect}
            className="ml-2 text-xs text-orange-600 hover:text-orange-700 underline"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleStravaConnect}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Connect with Strava
        </button>
      )}
    </div>
  );
};

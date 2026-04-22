import React from "react";
import { Registration } from "../hooks/useRegistrations";

interface RaceCardProps {
  registration: Registration;
}

export const RaceCard: React.FC<RaceCardProps> = ({ registration }) => {
  const progressPercentage =
    (registration.current_distance / registration.distance_goal) * 100;
  const clampedProgress = Math.min(progressPercentage, 100);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
      <div className="p-6">
        <h3 className="text-lg font-bold text-navy-900 mb-2">
          {registration.race_name}
        </h3>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-navy-700">Progress</span>
            <span className="text-sm font-semibold text-orange-600">
              {registration.current_distance.toFixed(1)} km of{" "}
              {registration.distance_goal} km
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-navy-600">
          <span>{clampedProgress.toFixed(1)}% Complete</span>
          <span className="text-xs text-gray-500">
            {new Date(registration.registered_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

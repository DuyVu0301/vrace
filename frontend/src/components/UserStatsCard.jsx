import React from "react";

export const UserStatsCard = ({ label, value, unit, icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">
          {label}
        </p>
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 text-xl`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <p className="text-3xl font-black text-gray-800">{value}</p>
        <span className="text-sm font-bold text-gray-400">{unit}</span>
      </div>
    </div>
  );
};

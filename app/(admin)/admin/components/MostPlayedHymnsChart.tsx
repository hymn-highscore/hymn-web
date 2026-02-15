"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BarChart3, TrendingUp } from "lucide-react";

const data = [
  { name: "Amazing Grace", value: 32 },
  { name: "Holy, Holy, Holy", value: 24 },
  { name: "How Great Thou Art", value: 18 },
  { name: "Blessed Assurance", value: 15 },
  { name: "Be Thou My Vision", value: 11 },
];

const COLORS = [
  "#8b5cf6", // purple-500
  "#6366f1", // indigo-500
  "#3b82f6", // blue-500
  "#14b8a6", // teal-500
  "#f43f5e", // rose-500
];

export default function MostPlayedHymnsChart() {
  return (
    <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-500" />
          Most Played Hymns
        </h3>
        <button className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center gap-1">
          <TrendingUp size={14} /> View Details
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* CHART */}
          <div className="w-full lg:w-1/2 h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  cornerRadius={5}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    color: "#1f2937",
                    fontSize: "14px",
                    padding: "12px"
                  }}
                  itemStyle={{ color: "#1f2937", fontWeight: 500 }}
                  cursor={false}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label (Optional) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">100</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Plays</span>
            </div>
          </div>

          {/* LEGEND */}
          <div className="w-full lg:w-1/2 space-y-4">
            {data.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white dark:bg-black/20 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

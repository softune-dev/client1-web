"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { stockSummaryData } from "@/lib/mock-data";

export function StockSummaryChart() {
  const total = stockSummaryData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <h3 className="text-base font-bold text-gray-900 mb-6">Warehouse Stock Summary</h3>
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8">
        {/* Chart */}
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stockSummaryData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {stockSummaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Inner Total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</span>
            <span className="text-xs text-gray-500">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          {stockSummaryData.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {item.value.toLocaleString()} <span className="text-gray-400">({item.percentage})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { ArrowUpRight, Package, Download, Truck, Navigation, ArrowRight } from "lucide-react";
import { summaryCards } from "@/lib/mock-data";

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
            <Package size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Total Warehouse Stock</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{summaryCards.totalStock.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{summaryCards.totalStock.label}</p>
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <ArrowUpRight size={16} className="text-green-500 mr-1" />
          <span className="text-green-500 font-medium">{summaryCards.totalStock.trend}</span>
          <span className="text-gray-500 ml-1">{summaryCards.totalStock.trendText}</span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-green-50 p-3 rounded-xl text-green-600">
            <Download size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Today's Received</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{summaryCards.receivedToday.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{summaryCards.receivedToday.label}</p>
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <ArrowUpRight size={16} className="text-green-500 mr-1" />
          <span className="text-green-500 font-medium">{summaryCards.receivedToday.trend}</span>
          <span className="text-gray-500 ml-1">{summaryCards.receivedToday.trendText}</span>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-orange-50 p-3 rounded-xl text-orange-500">
            <Truck size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Today's Delivered</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{summaryCards.deliveredToday.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{summaryCards.deliveredToday.label}</p>
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <ArrowUpRight size={16} className="text-green-500 mr-1" />
          <span className="text-green-500 font-medium">{summaryCards.deliveredToday.trend}</span>
          <span className="text-gray-500 ml-1">{summaryCards.deliveredToday.trendText}</span>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
            <Navigation size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Active Trips</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{summaryCards.activeTrips.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{summaryCards.activeTrips.label}</p>
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <a href={summaryCards.activeTrips.linkHref} className="text-blue-600 font-medium flex items-center hover:underline">
            {summaryCards.activeTrips.linkText.replace('→', '')} <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

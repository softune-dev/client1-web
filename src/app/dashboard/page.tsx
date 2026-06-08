import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { StockSummaryChart } from "@/components/dashboard/StockSummaryChart";
import { RecentTransactionsTable } from "@/components/dashboard/RecentTransactionsTable";
import { ActiveTripsTable } from "@/components/dashboard/ActiveTripsTable";
import { DeliverySummaryChart } from "@/components/dashboard/DeliverySummaryChart";
import { RecentDeliveriesTable } from "@/components/dashboard/RecentDeliveriesTable";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">Dashboard</span>
        </div>
      </div>

      {/* Row 1: Summary Cards */}
      <SummaryCards />

      {/* Row 2: Stock Summary Chart & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <StockSummaryChart />
        </div>
        <div className="lg:col-span-8">
          <RecentTransactionsTable />
        </div>
      </div>

      {/* Row 3: Active Trips & Delivery Summary Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <ActiveTripsTable />
        </div>
        <div className="lg:col-span-6">
          <DeliverySummaryChart />
        </div>
      </div>

      {/* Row 4: Recent Deliveries */}
      <div className="grid grid-cols-1 gap-6">
        <RecentDeliveriesTable />
      </div>

    </div>
  );
}

import { recentDeliveries } from "@/lib/mock-data";

export function RecentDeliveriesTable() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-gray-900">Recent Deliveries</h3>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">View All</a>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase border-b border-gray-100 bg-gray-50/50">
            <tr>
              <th className="px-4 py-3 font-medium">Delivery No.</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Retailer</th>
              <th className="px-4 py-3 font-medium">Vehicle</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium">Marketing Manager</th>
            </tr>
          </thead>
          <tbody>
            {recentDeliveries.map((delivery) => (
              <tr key={delivery.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{delivery.id}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{delivery.date}</td>
                <td className="px-4 py-3.5 whitespace-nowrap font-medium text-gray-700">{delivery.retailer}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{delivery.vehicle}</td>
                <td className="px-4 py-3.5 whitespace-nowrap font-medium text-gray-700">{delivery.product}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{delivery.quantity}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{delivery.manager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

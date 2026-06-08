import { activeTrips } from "@/lib/mock-data";

function getBadgeStyle(status: string) {
  switch (status) {
    case "In Transit":
      return "bg-blue-100 text-blue-700";
    case "Loaded":
      return "bg-emerald-100 text-emerald-700";
    case "Completed":
      return "bg-teal-100 text-teal-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function ActiveTripsTable() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-gray-900">Active Trips</h3>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">View All</a>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase border-b border-gray-100 bg-gray-50/50">
            <tr>
              <th className="px-4 py-3 font-medium">Trip No.</th>
              <th className="px-4 py-3 font-medium">Vehicle</th>
              <th className="px-4 py-3 font-medium">Driver</th>
              <th className="px-4 py-3 font-medium">Marketing Manager</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {activeTrips.map((trip) => (
              <tr key={trip.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3.5 whitespace-nowrap font-medium text-gray-700">{trip.id}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{trip.vehicle}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{trip.driver}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{trip.manager}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getBadgeStyle(trip.status)}`}>
                    {trip.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


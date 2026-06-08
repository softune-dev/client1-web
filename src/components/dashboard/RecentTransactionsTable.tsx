import { recentTransactions } from "@/lib/mock-data";

function getBadgeStyle(type: string) {
  switch (type) {
    case "Receive":
      return "bg-green-100 text-green-700";
    case "Load to Vehicle":
      return "bg-blue-100 text-blue-700";
    case "Delivery":
      return "bg-orange-100 text-orange-700";
    case "Return":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function RecentTransactionsTable() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-gray-900">Recent Stock Transactions</h3>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">View All</a>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase border-b border-gray-100 bg-gray-50/50">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium">Reference</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx, index) => (
              <tr key={tx.id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors`}>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{tx.date}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getBadgeStyle(tx.type)}`}>
                    {tx.type}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap font-medium text-gray-700">{tx.product}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">{tx.quantity}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-500">{tx.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

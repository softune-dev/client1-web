export const summaryCards = {
  totalStock: {
    value: "12,560",
    label: "Total Cylinders",
    trend: "+ 8.5%",
    trendText: "from last month",
    isPositive: true,
  },
  receivedToday: {
    value: "1,250",
    label: "Cylinders",
    trend: "+ 15.3%",
    trendText: "from yesterday",
    isPositive: true,
  },
  deliveredToday: {
    value: "1,820",
    label: "Cylinders",
    trend: "+ 12.7%",
    trendText: "from yesterday",
    isPositive: true,
  },
  activeTrips: {
    value: "12",
    label: "On The Way",
    linkText: "View all trips →",
    linkHref: "#",
  },
};

export const stockSummaryData = [
  { name: "12 KG", value: 4560, percentage: "36%", fill: "#2563eb" }, // blue-600
  { name: "15 KG", value: 3250, percentage: "26%", fill: "#16a34a" }, // green-600
  { name: "18 KG", value: 2450, percentage: "20%", fill: "#f97316" }, // orange-500
  { name: "22 KG", value: 1500, percentage: "12%", fill: "#dc2626" }, // red-600
  { name: "35 KG", value: 800, percentage: "6%", fill: "#9333ea" },  // purple-600
];

export const recentTransactions = [
  { id: 1, date: "02 Jun 2025", type: "Receive", product: "12 KG", quantity: 500, reference: "Fresh" },
  { id: 2, date: "02 Jun 2025", type: "Receive", product: "15 KG", quantity: 300, reference: "Boshundhara" },
  { id: 3, date: "02 Jun 2025", type: "Load to Vehicle", product: "12 KG", quantity: 100, reference: "TRP-00012" },
  { id: 4, date: "02 Jun 2025", type: "Delivery", product: "12 KG", quantity: 40, reference: "DEL-00045" },
  { id: 5, date: "02 Jun 2025", type: "Return", product: "15 KG", quantity: 20, reference: "RET-00012" },
];

export const activeTrips = [
  { id: "TRP-00012", vehicle: "Dhaka-TA-1234", driver: "Rahim Uddin", manager: "Karim Ahmed", status: "In Transit" },
  { id: "TRP-00011", vehicle: "Dhaka-TA-5678", driver: "Jasim Uddin", manager: "Sohel Rana", status: "In Transit" },
  { id: "TRP-00010", vehicle: "Dhaka-TA-9999", driver: "Monir Hossain", manager: "Rafiq Islam", status: "Loaded" },
  { id: "TRP-00009", vehicle: "Dhaka-TA-2222", driver: "Selim Uddin", manager: "Mahbub Hasan", status: "Completed" },
];

export const deliverySummaryData = [
  { time: "6 AM", value: 150 },
  { time: "7 AM", value: 500 },
  { time: "8 AM", value: 700 },
  { time: "9 AM", value: 700 },
  { time: "10 AM", value: 850 },
  { time: "11 AM", value: 700 },
  { time: "12 PM", value: 600 },
  { time: "1 PM", value: 1000 },
  { time: "2 PM", value: 900 },
  { time: "3 PM", value: 700 },
  { time: "4 PM", value: 620 },
  { time: "5 PM", value: 700 },
  { time: "6 PM", value: 600 },
  { time: "7 PM", value: 200 },
  { time: "8 PM", value: 350 },
  { time: "9 PM", value: 200 },
];

export const recentDeliveries = [
  { id: "DEL-00045", date: "02 Jun 2025 10:30 AM", retailer: "Rafiq Store", vehicle: "Dhaka-TA-1234", product: "12 KG", quantity: 20, manager: "Karim Ahmed" },
  { id: "DEL-00044", date: "02 Jun 2025 10:15 AM", retailer: "Molla Enterprise", vehicle: "Dhaka-TA-1234", product: "15 KG", quantity: 10, manager: "Karim Ahmed" },
  { id: "DEL-00043", date: "02 Jun 2025 09:45 AM", retailer: "Shapla Store", vehicle: "Dhaka-TA-5678", product: "12 KG", quantity: 15, manager: "Sohel Rana" },
  { id: "DEL-00042", date: "02 Jun 2025 09:30 AM", retailer: "Islam Traders", vehicle: "Dhaka-TA-5678", product: "18 KG", quantity: 10, manager: "Sohel Rana" },
];

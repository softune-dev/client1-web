export interface MarketingManager {
  id: number;
  name: string;
  employeeId: string;
  phoneNumber: string;
  username: string;
  assignedTrip: string; // e.g. "TRP-00012" or "Not Assigned"
  status: "Active" | "Inactive";
}

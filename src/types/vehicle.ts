export interface Vehicle {
  id: number;
  vehicleNumber: string;
  registrationNumber: string;
  capacity: number; // stored as number, displayed as e.g. "300 Cylinders"
  status: "Active" | "Inactive";
  onTrip: boolean;
}

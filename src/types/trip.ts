export interface TripCargo {
  size: string; // e.g. "12 KG", "15 KG", etc.
  quantity: number;
}

export interface Trip {
  id: number;
  tripNo: string;
  vehicle: string;
  driver: string;
  manager: string;
  date: string; // e.g. "02 Jun 2025"
  cargo: TripCargo[];
  status: "Draft" | "Loaded" | "In Transit" | "Completed";
  passcode: string;
}

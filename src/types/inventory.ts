export interface StockSummary {
  company: string,
  size: string;
  package: number;
  refill: number;
  emptyCylinder: number;
}

export interface ActivityLog {
  id: number;
  type: "Received" | "Transfer to Vehicle" | "Return";
  size: string;
  qty: number;
  location: string;
  date: string;
  user: string;
}

export interface Receipt {
  id: number;
  date: string;
  supplier: string;
  size: string;
  quantity: number;
  receivedBy: string;
  status: "Completed" | "Pending";
}

export interface TripDetails {
  tripNo: string;
  vehicle: string;
  driver: string;
  manager: string;
  date: string;
  status: string;
  loaded?: Record<string, number>;
  delivered?: Record<string, number>;
}

export interface CylinderRow {
  size: string;
  available?: number;
  loaded?: number;
  delivered?: number;
  quantity: number;
  status?: "Pending" | "Reconciled";
}

export interface ReturnEntry {
  id: number;
  returnNo: string;
  tripNo: string;
  qty: number;
  date: string;
  status: "Pending" | "Completed";
}

export interface LedgerEntry {
  id: number;
  dateTime: string;
  referenceNo: string;
  type: "Received" | "Transfer" | "Return";
  size: string;
  quantity: number;
  sourceDestination: string;
  performedBy: string;
  balance: number;
}

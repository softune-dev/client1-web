export interface ReturnCylinderRow {
  size: string;
  loaded: number;
  delivered: number;
  returnQty: number;
  status: "Pending" | "Reconciled";
}

export interface ReturnLog {
  id: number;
  returnNo: string;
  tripNo: string;
  date: string;
  totalReturned: number;
  status: "Pending" | "Reconciled";
  vehicle: string;
  driver: string;
  manager: string;
  cylinders: ReturnCylinderRow[];
}

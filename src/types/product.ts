export interface Product {
  id: number;
  supplier: string;
  size: string;
  status: "Active" | "Inactive";
  sales: number; // mock sales units
}

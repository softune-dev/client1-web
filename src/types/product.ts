export interface Product {
  id: number;
  name: string;
  size: string;
  status: "Active" | "Inactive";
  sales: number; // mock sales units
}

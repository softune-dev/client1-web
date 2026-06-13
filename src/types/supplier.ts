export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  phoneNumber: string;
  address: string;
  status: "Active" | "Inactive";
  logo: string; // Base64 data URL
}

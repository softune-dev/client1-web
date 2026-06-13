export interface Retailer {
  id: number;
  shopName: string;
  ownerName: string;
  phoneNumber: string;
  location: string;
  coords: string;
  status: "Active" | "Inactive";
}

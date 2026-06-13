export interface Driver {
  id: number;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
  status: "Active" | "Inactive";
  onTrip: boolean;
}

export interface User {
  id: number;
  fullName: string;
  username: string;
  role: string;
  phoneNumber: string;
  status: "Active" | "Inactive";
}

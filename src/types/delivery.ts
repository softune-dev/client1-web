export interface Delivery {
  id: number;
  deliveryNo: string;
  tripNo: string;
  retailer: string;
  owner: string;
  phone: string;
  address: string;
  coords: string;
  productSize: string;
  quantity: number;
  deliveryTime: string;
  manager: string;
  status: "Delivered" | "Pending";
}

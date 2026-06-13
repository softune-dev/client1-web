/**
 * Mock supplier data for initial development.
 */

import { type Supplier } from "@/types/supplier";

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "sup-001",
    name: "Fresh",
    contactPerson: "Abdul Karim",
    phoneNumber: "01712345678",
    address: "Dhaka, Bangladesh",
    status: "active",
  },
  {
    id: "sup-002",
    name: "Boshundhara",
    contactPerson: "Mahbub Hasan",
    phoneNumber: "01812345678",
    address: "Chattogram, Bangladesh",
    status: "active",
  },
  {
    id: "sup-003",
    name: "Total",
    contactPerson: "Rafiq Islam",
    phoneNumber: "01912345678",
    address: "Sylhet, Bangladesh",
    status: "active",
  },
];

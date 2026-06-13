import { redirect } from "next/navigation";

export default function InventoryPageRedirect() {
  redirect("/inventory/current-stock");
}

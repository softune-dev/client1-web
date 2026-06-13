import { redirect } from "next/navigation";

export default function TripsPageRedirect() {
  redirect("/trips/all-trips");
}

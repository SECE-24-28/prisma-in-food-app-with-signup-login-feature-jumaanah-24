import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getFoods } from "@/actions/food";
import FoodClient from "./FoodClient";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/Logoutbutton";

export default async function MenuPage() {
  const cookieStore = await cookies();

  const username = cookieStore.get("username")?.value;

  // Not logged in
  if (!username) {
    redirect("/login");
  }

  const foods = await getFoods();

  return (
    <>
      <div className="flex justify-between p-4">
        <h2>Welcome {username}</h2>
<Navbar/>
        <LogoutButton />
      </div>

      <FoodClient foods={foods} />
    </>
  );
}
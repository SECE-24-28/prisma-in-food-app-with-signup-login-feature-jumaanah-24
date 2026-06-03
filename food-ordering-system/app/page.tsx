import { getFoods } from "@/actions/food";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodList from "@/components/FoodList";

export default async function Home() {
  const foods = await getFoods();

  return (
    <>
      <Navbar />

      <main className="p-8">
        <h1 className="text-3xl font-bold mb-10">
          Online Food Ordering System
        </h1>

        <FoodList foods={foods} />
      </main>

      <Footer />
    </>
  );
}
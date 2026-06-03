"use client";

import { useState } from "react";
import FoodList from "@/components/FoodList";
import Search from "@/components/Search";

export default function FoodClient({
  foods,
}: {
  foods: any[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  const filteredFoods = foods
    .filter((food) => {
      const matchesSearch = food.item_name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        food.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "low") {
        return Number(a.price) - Number(b.price);
      }

      if (sortOrder === "high") {
        return Number(b.price) - Number(a.price);
      }

      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          🍴 Food Menu
        </h1>

        <p className="text-gray-400 mt-2">
          Discover delicious dishes and order your favorites.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8 shadow-lg">
        
        <Search
          search={search}
          setSearch={setSearch}
        />

        <div className="flex flex-wrap items-center gap-3 mt-5">
          
          <button
            onClick={() => setCategory("All")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              category === "All"
                ? "bg-white text-black"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
             All
          </button>

          <button
            onClick={() => setCategory("Veg")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              category === "Veg"
                ? "bg-green-600 text-white"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            🥗 Veg
          </button>

          <button
            onClick={() => setCategory("NonVeg")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              category === "NonVeg"
                ? "bg-red-600 text-white"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            🍗 Non-Veg
          </button>

          <div className="ml-auto">
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
              className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-xl outline-none"
            >
              <option value="">
                Sort By Price
              </option>

              <option value="low">
                Price ↑ Low to High
              </option>

              <option value="high">
                Price ↓ High to Low
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Food Cards */}
      <FoodList foods={filteredFoods} />
    </div>
  );
}
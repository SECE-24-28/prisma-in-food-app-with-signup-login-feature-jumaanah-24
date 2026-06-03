"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function FoodCard({
  food,
}: {
  food: any;
}) {
  const router = useRouter();

  function addToCart(food: any) {
    const username = document.cookie.includes("username");

    if (!username) {
      router.push("/login");
      return;
    }

  const existingCart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  existingCart.push(food);

  localStorage.setItem(
    "cart",
    JSON.stringify(existingCart)
  );

  alert("Added to Cart");
}

  return (
    <div className="border rounded-xl overflow-hidden shadow-lg">
      <Image
  src={food.image_url}
  alt={food.item_name}
  width={500}
  height={300}
  className="w-full h-64 object-contain bg-gray-100"
/>

      <div className="p-5">
        <h2 className="text-2xl font-bold">
          {food.item_name}
        </h2>

        <p>{food.description}</p>

        <div className="flex justify-between mt-4">
          <span>{food.category}</span>
          <span>₹{food.price}</span>
        </div>

<button
  onClick={() => addToCart(food)}
  className="w-full bg-black text-white py-2 rounded mt-4"
>
  Add to Cart
</button>
      </div>
    </div>
  );
}
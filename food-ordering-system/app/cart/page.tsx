"use client";

import { useEffect, useState } from "react";
import { placeOrder } from "@/actions/order";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

useEffect(() => {
  const username = document.cookie.includes("username");

  if (!username) {
    router.push("/login");
    return;
  }

  setAuthorized(true);

  const items = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const groupedItems: any = {};

  items.forEach((item: any) => {
    if (groupedItems[item.item_id]) {
      groupedItems[item.item_id].quantity += 1;
    } else {
      groupedItems[item.item_id] = {
        ...item,
        quantity: 1,
      };
    }
  });

  setCart(Object.values(groupedItems));
}, [router]);

  function updateCart(updatedCart: any[]) {
    setCart(updatedCart);

    const expandedCart: any[] = [];

    updatedCart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        expandedCart.push(item);
      }
    });

    localStorage.setItem(
      "cart",
      JSON.stringify(expandedCart)
    );
  }

  function increaseQty(id: number) {
    const updated = cart.map((item) =>
      item.item_id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    updateCart(updated);
  }

  function decreaseQty(id: number) {
    const updated = cart
      .map((item) =>
        item.item_id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  }

  function removeItem(id: number) {
    const updated = cart.filter(
      (item) => item.item_id !== id
    );

    updateCart(updated);
  }

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  async function handlePlaceOrder() {
    const result = await placeOrder(total);

    if (result.success) {
      localStorage.removeItem("cart");
      router.push("/order-success");
    }
  }
  if (!authorized) {
  return <h1>Loading...</h1>;
}

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-5xl font-bold mb-2">
        🛒 Your Cart
      </h1>

      <p className="text-gray-400 mb-10">
        Review your items and place your order
      </p>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">
            Your Cart is Empty
          </h2>

          <p className="text-gray-400 mt-3">
            Add some delicious food from the menu.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <div
                key={item.item_id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-5 shadow-lg"
              >
                <Image
                  src={item.image_url}
                  alt={item.item_name}
                  width={150}
                  height={150}
                  className="w-36 h-36 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {item.item_name}
                  </h2>

                  <p className="text-gray-400 mt-1">
                    {item.description}
                  </p>

                  <p className="text-green-400 font-semibold text-xl mt-3">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        decreaseQty(item.item_id)
                      }
                      className="bg-white hover:bg-red-200 px-3 py-1 rounded-lg text-black"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item.item_id)
                      }
                      className="bg-white hover:bg-green-200 px-3 py-1 rounded-lg text-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <p className="text-2xl font-bold">
                    ₹
                    {item.price *
                      item.quantity}
                  </p>

                  <button
                    onClick={() =>
                      removeItem(item.item_id)
                    }
                    className="bg-white hover:bg-red-200 px-4 py-2 rounded-lg text-black"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit shadow-lg">
            <h2 className="text-3xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>

              <hr className="border-zinc-700" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>
                  ₹{total + 40}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 py-4 rounded-xl text-lg font-semibold"
            >
              Place Order
            </button>

            <div className="mt-6 text-sm text-gray-400 space-y-2">
              <p> Fast Delivery</p>
              <p>Secure Payment</p>
              <p> 24/7 Support</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
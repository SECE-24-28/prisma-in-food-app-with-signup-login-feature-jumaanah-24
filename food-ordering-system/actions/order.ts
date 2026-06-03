"use server";

import { pool } from "@/lib/db";

export async function placeOrder(total: number) {
  const orderResult = await pool.query(
    `INSERT INTO orders
     (customer_id, partner_id, restaurant_id, total_price, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING order_id`,
    [1, 1, 1, total, "Placed"]
  );

  const orderId = orderResult.rows[0].order_id;

  await pool.query(
    `INSERT INTO payments
     (payment_mode, amount, status, order_id, customer_id)
     VALUES ($1, $2, $3, $4, $5)`,
    ["Cash", total, "Paid", orderId, 1]
  );

  return {
    success: true,
    orderId,
  };
}
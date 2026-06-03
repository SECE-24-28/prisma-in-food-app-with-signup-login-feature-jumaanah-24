"use server";

import { prisma } from "@/lib/prisma";

export async function getFoods() {
  return await prisma.menu_items.findMany();
}
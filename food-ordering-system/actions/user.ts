"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await prisma.users.create({
  data: {
    username,
    email,
    password,
  },
});

  redirect("/login");
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

const user = await prisma.users.findUnique({
  where: {
    email,
  },
});

  if (!user) {
    throw new Error("User Not Found");
  }

  if (user.password !== password) {
    throw new Error("Wrong Password");
  }

  const cookieStore = await cookies();

  cookieStore.set("username", user.username);

  redirect("/menu");
}

export async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.delete("username");

  redirect("/");
}
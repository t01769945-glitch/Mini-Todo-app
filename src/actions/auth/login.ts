"use server";

import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(3, "Password must be at least 3 characters long"),
});

export async function login(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");

  const result = schema.safeParse({ email, password });

  if (!result.success) {
    const errorMsg =
      Object.values(result.error.flatten().fieldErrors).flat()[0] ||
      "Invalid input";
    return {
      success: false,
      message: errorMsg,
    };
  }

  await connectDB();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return {
      success: false,
      message: "User doesn't exist with this email",
    };
  }

  const isValidPassword = await bcrypt.compare(
    password!.toString(),
    existingUser.password
  );

  if (!isValidPassword) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  const token = jwt.sign(
    { userId: existingUser._id },
    process.env.SECRET_KEY!,
    { expiresIn: "10m" }
  );

  const cookieStore = await cookies(); 
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 10, 
  });

  return {
    success: true,
    message: "Login successful",
  };
}

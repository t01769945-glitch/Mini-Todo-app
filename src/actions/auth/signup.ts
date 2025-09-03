"use server";

import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(3, "Password must be at least 3 characters long"),
});

export async function signup(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const result = schema.safeParse({ name, email, password });

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

  if (existingUser) {
    return {
      success: false,
      message: "User already exists with this email",
    };
  }

  const hashedPassword = await bcrypt.hash(password!.toString(), 10);

  const newUser = new User({
    username: name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return {
    success: true,
    message: "User created successfully! Please log in.",
  };
}

"use server";

import { getUserFromToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Todo } from "@/models/Todo";

export async function fetchTodos() {
  try {
    await connectDB();
    const result = await getUserFromToken();
    if (!result?.userId) {
      return {
        success: false,
        message: "Login first",
      };
    }
    const allTodos = await Todo.find({ userId: result.userId }).sort({
      createdAt: -1,
    });
    return {
      success: true,
      message: "All todos",
      todos: allTodos,
    };
  } catch (error: any) {
    return {
      success: true,
      message: error.message,
    };
  }
}

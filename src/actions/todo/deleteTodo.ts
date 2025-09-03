"use server";

import { connectDB } from "@/lib/db";
import { Todo } from "@/models/Todo";

export async function deleteTodo(todoId: string) {
  try {
    await connectDB();
    if (!todoId) return null;

    await Todo.findByIdAndDelete(todoId);
  } catch (error: any) {
    console.log("Error updating todo:", error.message);
    return null;
  }
}

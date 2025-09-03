"use server";

import { connectDB } from "@/lib/db";
import { Todo } from "@/models/Todo";

export async function updateTodo(todoId: string) {
  try {
    await connectDB();
    if (!todoId) return null;

    await Todo.findByIdAndUpdate(
      todoId,
      { isCompleted: true }
    );
  } catch (error: any) {
    console.log("Error updating todo:", error.message);
    return null;
  }
}

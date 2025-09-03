"use server";

import { getUserFromToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Todo } from "@/models/Todo";

export async function addTodo(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  try {
    await connectDB();
    const result = await getUserFromToken();
    if (!result?.userId) {
      return {
        success: false,
        message: "You are logged out",
      };
    }

    const todo = formData.get("todo");
    if (!todo) {
      return {
        success: false,
        message: "Write something in TODO",
      };
    }
    const existingTodo = await Todo.findOne({
      title: todo,
      userId: result?.userId,
    });
    if (existingTodo) {
      return {
        success: false,
        message: "TODO already added",
      };
    }
    const newTodo = new Todo({ title: todo, userId: result?.userId });
    await newTodo.save();

    return {
      success: true,
      message: "TODO added",
    };
  } catch (error: any) {
    return {
      success: true,
      message: error.message,
    };
  }
}

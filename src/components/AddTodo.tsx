"use client";

import { addTodo } from "@/actions/todo/addTodo";
import { useActionState } from "react";

export default function AddTodo(prop: { isLoggedIn: boolean }) {
  if (!prop.isLoggedIn) {
    return null;
  }
  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(addTodo, initialState);

  return (
    <div>
      <form
        action={formAction}
        className="flex gap-4 items-center bg-gray-100 p-4 rounded shadow-md max-w-xl mx-auto mt-6"
      >
        <input
          type="text"
          placeholder="Enter new todo..."
          name="todo"
          className="flex-grow p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
        >
          Add
        </button>
      </form>

      <p className={`text-center mt-3 text-sm ${state.success ? `hidden` : `text-red-500`}`}>{state.message}</p>
    </div>
  );
}

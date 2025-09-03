"use client";

import { updateTodo } from "@/actions/todo/updateTodo";
import { deleteTodo } from "@/actions/todo/deleteTodo";

export default function AllTodos({ todos }: { todos: any[] }) {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-4">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex justify-between items-center p-4 bg-white rounded shadow border"
        >
          <span
            className={`text-lg ${
              todo.isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </span>
          <div className="space-x-2">
            <button
              className="text-green-600 hover:underline hover:cursor-pointer"
              onClick={() => {
                alert("TODO updated refresh the page");
                updateTodo(todo._id);
              }}
            >
              Complete
            </button>
            <button
              className="text-red-600 hover:underline hover:cursor-pointer"
              onClick={() => {
                alert("TODO deleted refresh the page");
                deleteTodo(todo._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

import { fetchTodos } from "@/actions/todo/fetchTodos";
import TodoList from "./Todos";

export default async function AllTodos({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  if (!isLoggedIn) return null;

  const todos = await fetchTodos();

  if (!todos?.todos) return null;
  const plainTodos = JSON.parse(JSON.stringify(todos.todos))

  return <TodoList todos={plainTodos} />;
}

import AddTodo from "@/components/AddTodo"
import AllTodos from "@/components/AllTodos";
import Todos from "@/components/Todos"
import { getUserFromToken } from "@/lib/auth";

export default async function Home() {
  const result = await getUserFromToken()
  const isLoggedIn = result?.userId ? true : false

  return (
    <>
      <AddTodo isLoggedIn={isLoggedIn}/>
      
      <AllTodos isLoggedIn={isLoggedIn}/>
    </>
  );
}

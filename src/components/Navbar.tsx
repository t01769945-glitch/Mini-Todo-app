import Link from "next/link";

export default function Navbar(prop: { isLoggedIn: boolean }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Todo App</h1>
        <div className="space-x-4 flex">
          <Link href="/" className="hover:underline hover:cursor-pointer">Home</Link>

          {prop.isLoggedIn ? (
            <Link
              href="/logout"
              className="hover:underline hover:cursor-pointer"
            >
              Logout
            </Link>
          ) : (
            <div className="flex gap-4">
              <Link
                href="/login"
                className="hover:underline hover:cursor-pointer"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:underline hover:cursor-pointer"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

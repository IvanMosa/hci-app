import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link href="/">Freelancia</Link>
      </div>

      <div className="space-x-6">
        <Link
          href="/"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/profile"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Profile
        </Link>
        <Link
          href="/dashboard"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Dashboard
        </Link>
        <Link
          href="/login"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

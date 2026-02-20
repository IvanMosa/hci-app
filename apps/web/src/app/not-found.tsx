import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-gray-300">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-gray-500">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

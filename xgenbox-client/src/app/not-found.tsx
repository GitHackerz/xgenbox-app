"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          404
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Page not found. Go back to{" "}
          <button
            className="text-blue-500 dark:text-blue-400"
            onClick={() => router.push("/")}
          >
            Home
          </button>
        </p>
      </div>
    </div>
  );
}

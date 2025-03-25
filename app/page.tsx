"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        Welcome to the worst ticket system ever
      </h1>

      <button
        onClick={() => router.push("/ticket")}
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition"
      >
        Start
      </button>

      <p className="absolute bottom-4 right-4 text-xs text-gray-400">
        created by Tattep Lakmuang Ken
      </p>
    </div>
  );
}

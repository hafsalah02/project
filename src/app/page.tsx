"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
export default function Home() {
  return (
    <main>
      Protected Page
      <button
        onClick={() => {
          signOut();
        }}
        className="text-white p-1 bg-blue-600 rounded-xl shadow-blue-300 shadow-md m-2"
      >
        signout
      </button>
    </main>
  );
}

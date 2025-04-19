import React from "react";
import { Logo } from "./components/brand/atoms/Logo";

export function App() {
  return (
    <div className="bg-gray-50 grid grid-cols-[240px_1fr] grid-rows-[auto_1fr] h-screen w-full py-6 px-8 gap-4.5">
      <header className="col-span-2">
        <Logo aria-hidden />
      </header>

      <aside></aside>

      <main className="bg-white rounded-lg border border-gray-300"></main>
    </div>
  );
}

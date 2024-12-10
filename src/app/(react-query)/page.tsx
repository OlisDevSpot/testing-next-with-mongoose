"use client";

import Users from "../_components/Users";
import AddUser from "../_components/AddUser";

export default function Home() {
  return (
    <main className="h-full w-full flex gap-4 items-center justify-center bg-neutral-200">
      <div className="flex gap-8 items-center justify-center h-[80%] w-full px-8">
        <Users />
        <AddUser />
      </div>
    </main>
  );
}

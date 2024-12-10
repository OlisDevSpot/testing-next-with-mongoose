"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Users from "./_components/Users";
import AddUser from "./_components/AddUser";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <main className="h-full w-full flex gap-4 items-center justify-center bg-neutral-200">
        <div className="flex gap-8 items-center justify-center h-[80%] w-full px-8">
          <Users />
          <AddUser />
        </div>
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

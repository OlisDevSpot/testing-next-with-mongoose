"use client";

import { IUser } from "@/models/user.model";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = params;

  const { users } = queryClient.getQueryData(["users"]);
  console.log({ users });
  const user = users.find((user: IUser) => user._id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ArrowLeftCircle
        size={36}
        className="absolute top-8 left-8 transition cursor-pointer rounded-full"
        onClick={() => router.back()}
      />
      <div>
        <h1 className="font-bold text-lg">
          {user.firstName} {user.lastName}
        </h1>
        <p>{user._id}</p>
      </div>
    </div>
  );
}

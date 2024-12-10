import { IUser } from "@/models/user.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Users() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:3001/api/users").then((res) => res.json()),
  });

  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="rotate-360 animate-spin">
          <LoaderIcon />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-rose-300 rounded-md shadow-xl shadow-rose-500/50 grid grid-cols-3 gap-4 p-4 content-start">
      {users.users.map((user: IUser) => (
        <div
          key={String(user._id)}
          className="p-4 border rounded-md hover:bg-rose-400 transition flex justify-between items-center cursor-pointer"
          onClick={() => router.push(`/user/${user._id}`)}
        >
          <p className="text-lg font-bold">
            {user.firstName} {user.lastName}
          </p>
          <div
            onClick={(e) => {
              e.stopPropagation();
              deleteUser.mutate(String(user._id));
            }}
            className="w-8 h-8 rounded-full transition cursor-pointer bg-neutral-950 text-neutral-300 hover:bg-neutral-700 flex items-center justify-center"
          >
            <Trash size={18} />
          </div>
        </div>
      ))}
    </div>
  );
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useRef } from "react";

export default function AddUser() {
  const queryClient = useQueryClient();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const userMutation = useMutation({
    mutationFn: async (userData) => {
      fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      new Promise((res) => setTimeout(res, 100)).then(() => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      });
    },
  });

  useEffect(() => {
    firstNameRef.current!.focus();
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("firstName"), formData.get("lastName"));
    userMutation.mutate({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
    });

    firstNameRef.current!.value = "";
    lastNameRef.current!.value = "";
    firstNameRef.current!.focus();
  };

  return (
    <div className="h-full bg-rose-500 rounded-md shadow-xl shadow-rose-500/50 p-4">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col gap-4 text-neutral-200"
        autoComplete="off"
      >
        <input
          ref={firstNameRef}
          type="text"
          placeholder="First name"
          id="firstName"
          name="firstName"
          className="bg-transparent p-2 border rounded-md outline-none"
        />
        <input
          ref={lastNameRef}
          type="text"
          placeholder="Last name"
          id="lastName"
          name="lastName"
          className="bg-transparent p-2 border rounded-md outline-none"
        />
        <button type="submit" className="p-2 rounded-md bg-rose-800">
          Add user
        </button>
      </form>
    </div>
  );
}

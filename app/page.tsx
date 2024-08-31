"use client";

import AddUserDialog from "@/components/AddUserDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formSchema } from "@/lib/formSchema/userSchema";
import { useAddUser, useDeleteUser } from "@/lib/mutations/userMutations";
import { useGetAllUsers } from "@/lib/queries/userQueries";
import { User } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// BEFORE YOU START: Make sure you connected this app to supabase
// In your .env make sure to include the DATABASE_URL
// To run the migrations and basically match the schema with the database, run the following command:
// npx prisma migrate dev --name init
// ==================Frontend Task==================
// TODO:
// (1) Call the useUpdateUser Mutation found under lib/mutations/userMutations.ts and follow the pattern above
// (2) Create a new function called handleUpdateUser that takes in a User object and calls the mutate function from the useUpdateUser hook
// (3) Create a new dialog component just like AddUserDialog for update user functionality
// (4) Add a button to update the user in the Card component below
// (5) Make sure to call the refetch function after updating the user to get the latest data
// (6) Test the update user functionality by updating a user and checking if the data is updated in the UI

export default function Home() {
  // State to control the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Call Get All Users Hook
  // Can be found in lib/queries/userQueries.ts
  const { data: users, isFetched, refetch } = useGetAllUsers();

  // Call Delete User Hook
  // Can be found in lib/mutations/userMutations.ts
  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: () => {
      toast.success("User deleted successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  // Call Add User Hook
  // Can be found in lib/mutations/userMutations.ts
  const { mutate: addUser } = useAddUser({
    onSuccess: () => {
      toast.success("User added successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to add user");
    },
  });

  // Function to handle adding a user
  // This will be passed to the AddUserDialog component
  const handleAddUser = (data: z.infer<typeof formSchema>) => {
    addUser({ userData: data });
    setIsDialogOpen(false);
  };

  return (
    <main className="p-6">
      <div className="flex gap-4">
        <p className="text-2xl">Users</p>
        <AddUserDialog
          onAddUser={handleAddUser}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
        />
      </div>
      <div className="flex flex-col gap-4">
        {users &&
          users.map((user: User) => {
            return (
              <Card key={user.id} className="w-96">
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
                <h2>{user.password}</h2>
                <Button
                  onClick={() => {
                    deleteUser({
                      id: user.id.toString(),
                    });
                  }}
                  variant="destructive"
                >
                  Delete User
                </Button>
              </Card>
            );
          })}
      </div>
    </main>
  );
}

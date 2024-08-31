import { User } from "@prisma/client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createUser, deleteUser, updateUser } from "../service/userService";

// The useAddUser hook is used to add a new user to the database.
// It takes a user object as an argument and returns the added user object.
// createUser can be found in lib/service/userService.ts.
export const useAddUser = (
  mutationOptions: UseMutationOptions<User, Error, { userData: Partial<User> }>
) =>
  useMutation({
    mutationFn: ({ userData }) => createUser(userData),
    ...mutationOptions,
  });

// The useUpdateUser hook is used to update an existing user in the database.
// It takes a user ID and a user object as arguments and returns the updated user object.
// updateUser can be found in lib/service/userService.ts.
export const useUpdateUser = (
  mutationOptions: UseMutationOptions<
    User,
    Error,
    { id: string; userData: Partial<User> }
  >
) =>
  useMutation({
    mutationFn: ({ id, userData }) => updateUser(id, userData),
    ...mutationOptions,
  });

// The useDeleteUser hook is used to delete a user from the database.
// It takes a user ID as an argument and returns the deleted user object.
// deleteUser can be found in lib/service/userService.ts.
export const useDeleteUser = (
  mutationOptions: UseMutationOptions<User, Error, { id: string }>
) =>
  useMutation({
    mutationFn: ({ id }) => deleteUser(id),
    ...mutationOptions,
  });

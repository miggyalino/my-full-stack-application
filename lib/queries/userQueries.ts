import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserById } from "../service/userService";

// React Query is a library that provides hooks for fetching, caching and updating asynchronous data in React.
// The useQuery hook is used to fetch data from an API and cache it in the browser.
// It takes a query key and a query function as arguments and returns the data.
// The query key is an array that uniquely identifies the query.
// The query function is an async function that fetches the data from the API.

// The useGetAllUsers hook is used to fetch all users from the API.
// It returns an array of user objects.
// getAllUsers can be found in lib/service/userService.ts.
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
};

// The useGetUniqueUser hook is used to fetch a single user by their ID.
// It takes an ID as an argument and returns the user object.
// getUserById can be found in lib/service/userService.ts.
export const useGetUniqueUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
};

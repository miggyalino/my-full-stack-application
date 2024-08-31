import { User } from "@prisma/client";
import { BASE_URL, USERS_URL } from "../fetch-constants";

// These functions are used to interact with the user API endpoints.
// BASE_URL and USERS_URL can be found in lib/fetch-constants.ts.
export const getAllUsers = async () => {
  const data = await fetch(`${BASE_URL}${USERS_URL}`);
  const response = await data.json();
  return response;
};

export const getUserById = async (id: string) => {
  const data = await fetch(`${BASE_URL}${USERS_URL}/${id}`);
  const response = await data.json();
  return response;
};

export const createUser = async (user: Partial<User>) => {
  const data = await fetch(`${BASE_URL}${USERS_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const response = await data.json();
  return response;
};

export const updateUser = async (id: string, user: Partial<User>) => {
  const data = await fetch(`${BASE_URL}${USERS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const response = await data.json();
  return response;
};

export const deleteUser = async (id: string) => {
  const data = await fetch(`${BASE_URL}${USERS_URL}/${id}`, {
    method: "DELETE",
  });
  const response = await data.json();
  return response;
};

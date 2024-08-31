"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

// ReactQueryClientProvider is a wrapper component that provides the React Query client to the application.
// It takes a children prop and returns a QueryClientProvider component with the queryClient as the client prop.
// The children prop is the content that will be wrapped by the provider.
// This is called in the layout.tsx file to provide the client to the entire application.
export const ReactQueryClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

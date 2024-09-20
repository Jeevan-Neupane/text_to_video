"use client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function ReactQueryProvider({children}) {
  const queryClient = new QueryClient(); // Create a new instance of QueryClient

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;

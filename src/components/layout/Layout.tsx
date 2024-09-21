"use client";
import type { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <body className="flex h-screen w-full flex-col items-start justify-start overflow-y-auto">
      <main className="h-full w-full flex-1">{children}</main>
    </body>
  </QueryClientProvider>
);

export default Layout;

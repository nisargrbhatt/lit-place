"use client";
import type { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Header from "./Header";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <body className="flex h-screen w-full flex-col items-start justify-start overflow-y-auto">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <main className="mx-auto h-full w-full max-w-screen-xl flex-1 px-1 pt-2">
          {children}
        </main>
      </ThemeProvider>
    </body>
  </QueryClientProvider>
);

export default Layout;

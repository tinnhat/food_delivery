"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { useState } from "react";
import "antd/dist/reset.css"; 

const theme = {
  token: {
    colorPrimary: "#f97316", 
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f8fafc",
    colorText: "#1f2937",
    colorTextSecondary: "#6b7280",
    borderRadius: 8,
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};

export function AntDesignProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 10 * 60 * 1000, // 10 minutes
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}
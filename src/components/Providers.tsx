"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { useState } from "react";
import "antd/dist/reset.css"; // Import Ant Design CSS here to prevent FOUC
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: "#f97316", // Orange theme for food delivery
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f8fafc",
    colorText: "#1f2937",
    colorTextSecondary: "#6b7280",
    borderRadius: 8,
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
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
      <AuthProvider>
        <CartProvider>
          <ConfigProvider theme={theme}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ConfigProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
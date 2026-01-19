import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodDelivery - Order Food Online",
  description: "Order delicious food from your favorite restaurants with fast delivery",
  keywords: ["food delivery", "restaurants", "online ordering", "takeout", "food"],
  authors: [{ name: "FoodDelivery Team" }],
  robots: "index, follow",
  openGraph: {
    title: "FoodDelivery - Order Food Online",
    description: "Order delicious food from your favorite restaurants with fast delivery",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodDelivery - Order Food Online",
    description: "Order delicious food from your favorite restaurants with fast delivery",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
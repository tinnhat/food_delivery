"use client";

import { Layout as AntLayout } from "antd";
import { Header } from "./Header";
import { Footer } from "./Footer";

const { Content } = AntLayout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AntLayout className="min-h-screen">
      <Header />
      <Content className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </Content>
      <Footer />
    </AntLayout>
  );
}
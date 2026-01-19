"use client";

import { Layout, Menu, Button, Badge, Input } from "antd";
import { ShoppingCartOutlined, UserOutlined, HomeOutlined, ShopOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header: AntHeader } = Layout;
const { Search } = Input;

export function Header() {
  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: "restaurants",
      icon: <ShopOutlined />,
      label: <Link href="/restaurants">Restaurants</Link>,
    },
  ];

  return (
    <AntHeader className="bg-white shadow-sm px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors">
              🍕 FoodDelivery
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Menu
              mode="horizontal"
              items={menuItems}
              className="border-none bg-transparent"
            />

            <Search
              placeholder="Search restaurants..."
              style={{ width: 250 }}
              size="large"
              className="rounded-full"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button
              type="text"
              icon={<UserOutlined />}
              size="large"
              className="hidden md:flex"
            >
              Account
            </Button>

            <Badge count={3} size="small">
              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                size="large"
                className="relative"
              >
                <span className="hidden md:inline ml-2">Cart</span>
              </Button>
            </Badge>

            {/* Mobile Search - only visible on mobile */}
            <div className="md:hidden">
              <Search
                placeholder="Search..."
                style={{ width: 150 }}
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </AntHeader>
  );
}
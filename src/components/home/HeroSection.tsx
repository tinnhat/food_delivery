"use client";

import { Button, Input, Typography, Card } from "antd";
import { SearchOutlined, ClockCircleOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Search } = Input;

export function HeroSection() {
  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // TODO: Implement search functionality
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-3xl p-8 md:p-12 lg:p-16 text-white overflow-hidden shadow-xl">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 left-8 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-16 right-16 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-white rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Floating Food Emojis */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-1/4 text-4xl animate-bounce delay-300">🍕</div>
        <div className="absolute top-32 right-1/3 text-3xl animate-bounce delay-700">🍔</div>
        <div className="absolute bottom-20 left-1/6 text-4xl animate-bounce delay-1000">🥗</div>
        <div className="absolute bottom-32 right-1/4 text-3xl animate-bounce delay-500">🍜</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            <div>
              <Title level={1} className="text-white mb-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Delicious food,
                <span className="block text-yellow-300">delivered fast</span>
              </Title>

              <Paragraph className="text-white text-lg md:text-xl opacity-95 max-w-2xl leading-relaxed">
                Order from your favorite restaurants and get fresh, hot meals delivered to your door in minutes.
                Choose from thousands of restaurants across the city.
              </Paragraph>
            </div>

            {/* Enhanced Search */}
            <div className="max-w-lg">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                <Search
                  placeholder="Enter your delivery address or restaurant name..."
                  enterButton={
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      size="large"
                      className="bg-white text-orange-500 hover:bg-gray-50 border-none font-semibold"
                    >
                      Find Food
                    </Button>
                  }
                  size="large"
                  onSearch={handleSearch}
                />
              </div>
              <div className="mt-3 flex items-center text-white/80 text-sm">
                <span className="mr-2">📍</span>
                <span>We deliver to your location</span>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics Cards */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">
                    <ShopOutlined />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm opacity-90">Restaurants</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">
                    <UserOutlined />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1M+</div>
                    <div className="text-sm opacity-90">Happy Customers</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 lg:col-span-2">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">
                    <ClockCircleOutlined />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15 min</div>
                    <div className="text-sm opacity-90">Average Delivery</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button type="primary" size="large" className="bg-white text-orange-500 hover:bg-gray-50 border-none font-semibold">
                Order Now
              </Button>
              <Button type="default" size="large" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                Browse Restaurants
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
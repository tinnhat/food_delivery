"use client";

import { Button, Input, Typography, Card } from "antd";
import { SearchOutlined, ClockCircleOutlined, StarOutlined, FireOutlined, TruckOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

export function HeroSection() {
  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // TODO: Implement search functionality
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-orange-600 to-red-500 overflow-hidden">
      {/* Animated Background Elements - Reduced animations */}
      <div className="absolute inset-0 opacity-20">
        {/* Large gradient orbs - removed animate-pulse */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      {/* Floating Food Elements - Reduced animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl opacity-30">🍕</div>
        <div className="absolute top-32 right-16 text-5xl opacity-25">🍔</div>
        <div className="absolute bottom-32 left-20 text-4xl opacity-20">🥗</div>
        <div className="absolute bottom-20 right-12 text-5xl opacity-30">🍜</div>
        <div className="absolute top-1/3 left-1/4 text-4xl opacity-25">🌮</div>
        <div className="absolute bottom-1/3 right-1/3 text-3xl opacity-20">🍣</div>
        <div className="absolute top-2/3 left-1/6 text-4xl opacity-25">🥪</div>
      </div>

      {/* Geometric Shapes - Static */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/4 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute top-24 right-1/3 w-1 h-1 bg-orange-300 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-yellow-300 rounded-full"></div>
        <div className="absolute bottom-16 right-1/4 w-2 h-2 bg-pink-300 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <FireOutlined className="text-orange-300" />
                <Text className="text-white font-medium">🔥 Most Loved Food Delivery App</Text>
              </div>

              {/* Main Heading */}
              <div>
                <Title level={1} className="text-white mb-6 text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                  <span className="block">Delicious Food,</span>
                  <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                    Delivered Fast
                  </span>
                </Title>

                <Paragraph className="text-white/90 text-xl md:text-2xl leading-relaxed max-w-2xl">
                  Craving something delicious? Order from your favorite restaurants and get fresh, hot meals
                  delivered to your doorstep in minutes. Join millions of happy customers!
                </Paragraph>
              </div>

              {/* Enhanced Search */}
              <div className="max-w-2xl">
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-3 shadow-2xl border border-white/20 hover:shadow-orange-500/20 transition-all duration-300">
                  <Search
                    placeholder="Enter your delivery address or restaurant name..."
                    enterButton={
                      <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        size="large"
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none font-bold text-white shadow-lg"
                      >
                        Find Food
                      </Button>
                    }
                    size="large"
                    onSearch={handleSearch}
                    className="text-lg"
                  />
                </div>

                {/* Location Info */}
                <div className="mt-4 flex items-center justify-center space-x-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <TruckOutlined className="text-green-400" />
                    <span className="text-sm font-medium">Free delivery over $25</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockCircleOutlined className="text-blue-400" />
                    <span className="text-sm font-medium">15 min average delivery</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="large"
                  className="bg-white text-orange-600 hover:bg-orange-50 border-none font-bold px-8 py-3 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  🍽️ Order Now
                </Button>
                <Button
                  size="large"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-3 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🏪 Browse Restaurants
                </Button>
              </div>
            </div>

            {/* Right Column - Enhanced Stats Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-2xl">
                      🏪
                    </div>
                    <div>
                      <div className="text-3xl font-black text-transparent bg-gradient-to-r from-white to-orange-200 bg-clip-text">
                        50K+
                      </div>
                      <div className="text-sm opacity-90 font-medium">Restaurants</div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
                      👥
                    </div>
                    <div>
                      <div className="text-3xl font-black text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                        1M+
                      </div>
                      <div className="text-sm opacity-90 font-medium">Happy Customers</div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 lg:col-span-2">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-3xl">
                      ⚡
                    </div>
                    <div>
                      <div className="text-3xl font-black text-transparent bg-gradient-to-r from-white to-green-200 bg-clip-text">
                        15 min
                      </div>
                      <div className="text-sm opacity-90 font-medium">Average Delivery Time</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Proof */}
              <Card className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border-white/20 text-white">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarOutlined key={i} className="text-yellow-400 text-lg" />
                    ))}
                  </div>
                  <div className="text-lg font-bold">4.8/5 Rating</div>
                  <div className="text-sm opacity-90">Trusted by millions of users worldwide</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Static */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}
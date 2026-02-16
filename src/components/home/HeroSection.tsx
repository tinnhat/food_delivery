"use client";

import { Button, Input, Typography, Card } from "antd";
import { SearchOutlined, ClockCircleOutlined, StarOutlined, FireOutlined, TruckOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

export function HeroSection() {
  // Always call hooks at the top level - follows Rules of Hooks
  const auth = useAuth();

  // Safely access context values
  const isAuthenticated = auth?.isAuthenticated || false;
  const logout = auth?.logout || (() => {});

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // TODO: Implement search functionality
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 overflow-hidden">
      {/* Login/Logout Buttons */}
      <div className="absolute top-6 right-6 z-20">
        {isAuthenticated ? (
          <Button
            type="primary"
            icon={<UserOutlined />}
            size="large"
            onClick={logout}
            className="bg-emerald-500 hover:bg-emerald-600 border-none text-white rounded-lg shadow-md"
          >
            Logout
          </Button>
        ) : (
          <Link href="/auth">
            <Button
              type="primary"
              icon={<UserOutlined />}
              size="large"
              className="bg-emerald-500 hover:bg-emerald-600 border-none text-white rounded-lg shadow-md"
            >
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Animated Background Elements - Soft gradients */}
      <div className="absolute inset-0 opacity-40">
        {/* Large gradient orbs - soft colors */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-emerald-100 to-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
      </div>

      {/* Floating Food Elements - Subtle animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl opacity-20">🍕</div>
        <div className="absolute top-32 right-16 text-5xl opacity-15">🍔</div>
        <div className="absolute bottom-32 left-20 text-4xl opacity-10">🥗</div>
        <div className="absolute bottom-20 right-12 text-5xl opacity-20">🍜</div>
        <div className="absolute top-1/3 left-1/4 text-4xl opacity-15">🌮</div>
        <div className="absolute bottom-1/3 right-1/3 text-3xl opacity-10">🍣</div>
        <div className="absolute top-2/3 left-1/6 text-4xl opacity-15">🥪</div>
      </div>

      {/* Geometric Shapes - Subtle accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-40"></div>
        <div className="absolute top-24 right-1/3 w-1 h-1 bg-teal-400 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-emerald-300 rounded-full opacity-35"></div>
        <div className="absolute bottom-16 right-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 space-y-8">
             {/* Badge */}
             <div className="inline-flex items-center space-x-2 bg-emerald-100 rounded-full px-4 py-2 border border-emerald-200">
               <FireOutlined className="text-emerald-600" />
               <Text className="text-emerald-700 font-medium">🔥 Most Loved Food Delivery App</Text>
             </div>

             {/* Main Heading */}
             <div>
               <Title level={1} className="text-gray-900 mb-6 text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                 <span className="block">Delicious Food,</span>
                 <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                   Delivered Fast
                 </span>
               </Title>

               <Paragraph className="text-gray-600 text-xl md:text-2xl leading-relaxed max-w-2xl">
                 Craving something delicious? Order from your favorite restaurants and get fresh, hot meals
                 delivered to your doorstep in minutes. Join millions of happy customers!
               </Paragraph>
             </div>

               {/* Enhanced Search */}
               <div className="max-w-2xl">
                 <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-300">
                   <Search
                     placeholder="Enter your delivery address or restaurant name..."
                     enterButton={
                       <Button
                         type="primary"
                         icon={<SearchOutlined />}
                         size="large"
                         className="bg-emerald-500 hover:bg-emerald-600 border-none font-bold text-white rounded-lg shadow-md"
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
                 <div className="mt-4 flex items-center justify-center space-x-6 text-gray-600">
                   <div className="flex items-center space-x-2">
                     <TruckOutlined className="text-emerald-600" />
                     <span className="text-sm font-medium">Free delivery over $25</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <ClockCircleOutlined className="text-teal-600" />
                     <span className="text-sm font-medium">15 min average delivery</span>
                   </div>
                 </div>
               </div>

               {/* Quick Action Buttons */}
               <div className="flex flex-wrap gap-4 pt-4">
                 <Button
                   size="large"
                   className="bg-emerald-500 text-white hover:bg-emerald-600 border-none font-bold px-8 py-3 h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                 >
                   🍽️ Order Now
                 </Button>
                 <Button
                   size="large"
                   className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 h-auto rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                 >
                   🏪 Browse Restaurants
                 </Button>
               </div>
            </div>

             {/* Right Column - Enhanced Stats Cards */}
             <div className="lg:col-span-5 space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                 <Card className="bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all duration-500 hover:scale-105 hover:shadow-lg">
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-2xl">
                       🏪
                     </div>
                     <div>
                       <div className="text-3xl font-black text-emerald-600">
                         50K+
                       </div>
                       <div className="text-sm text-gray-600 font-medium">Restaurants</div>
                     </div>
                   </div>
                 </Card>

                 <Card className="bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all duration-500 hover:scale-105 hover:shadow-lg">
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl">
                       👥
                     </div>
                     <div>
                       <div className="text-3xl font-black text-blue-600">
                         1M+
                       </div>
                       <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
                     </div>
                   </div>
                 </Card>

                 <Card className="bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all duration-500 hover:scale-105 hover:shadow-lg lg:col-span-2">
                   <div className="flex items-center space-x-6">
                     <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center text-3xl">
                       ⚡
                     </div>
                     <div>
                       <div className="text-3xl font-black text-teal-600">
                         15 min
                       </div>
                       <div className="text-sm text-gray-600 font-medium">Average Delivery Time</div>
                     </div>
                   </div>
                 </Card>
               </div>

               {/* Social Proof */}
               <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-gray-900">
                 <div className="text-center space-y-3">
                   <div className="flex items-center justify-center space-x-1">
                     {[...Array(5)].map((_, i) => (
                       <StarOutlined key={i} className="text-amber-400 text-lg" />
                     ))}
                   </div>
                   <div className="text-lg font-bold text-gray-900">4.8/5 Rating</div>
                   <div className="text-sm text-gray-600">Trusted by millions of users worldwide</div>
                 </div>
               </Card>
             </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Static */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}
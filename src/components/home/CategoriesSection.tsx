"use client";

import { Card, Typography, Button } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

const categories = [
  {
    id: "1",
    name: "Italian",
    icon: "🍕",
    emoji: "🇮🇹",
    color: "bg-red-100 text-red-600 hover:bg-red-200",
    count: "120+ restaurants",
    description: "Pizza, Pasta & more",
    popular: true,
  },
  {
    id: "2",
    name: "Asian",
    icon: "🍜",
    emoji: "🥢",
    color: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
    count: "85+ restaurants",
    description: "Sushi, Noodles & Asian cuisine",
    popular: false,
  },
  {
    id: "3",
    name: "Fast Food",
    icon: "🍔",
    emoji: "🚀",
    color: "bg-orange-100 text-orange-600 hover:bg-orange-200",
    count: "95+ restaurants",
    description: "Burgers, Fries & Quick bites",
    popular: true,
  },
  {
    id: "4",
    name: "Healthy",
    icon: "🥗",
    emoji: "🌱",
    color: "bg-green-100 text-green-600 hover:bg-green-200",
    count: "60+ restaurants",
    description: "Salads, Smoothies & Healthy options",
    popular: false,
  },
];

export function CategoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // TODO: Navigate to category page or filter restaurants
    console.log("Selected category:", categoryId);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-4">
            <span className="text-lg">🍽️</span>
            <span className="font-semibold text-sm">Explore Cuisine</span>
          </div>
          <Title level={2} className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
            Browse by Category
          </Title>
          <Text className="text-gray-600 text-xl max-w-2xl mx-auto">
            Discover restaurants by your favorite cuisine and explore diverse flavors from around the world
          </Text>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              hoverable
              className={`group text-center cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-0 relative overflow-hidden ${
                selectedCategory === category.id
                  ? 'shadow-2xl scale-105 bg-gradient-to-br from-orange-50 to-red-50'
                  : 'bg-white shadow-lg hover:shadow-orange-200/50'
              }`}
              bodyStyle={{ padding: "32px 24px" }}
              onClick={() => handleCategoryClick(category.id)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 transform rotate-12 scale-150"></div>
              </div>

              <div className="relative z-10 space-y-4">
                {/* Icon with Enhanced Styling */}
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl ${category.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl group-hover:shadow-2xl mx-auto`}>
                  <span className="text-4xl drop-shadow-sm">{category.icon}</span>
                </div>

                {/* Content */}
                <div>
                  <Title level={4} className="mb-2 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {category.name}
                  </Title>
                  <Text className="text-gray-600 text-sm block mb-3 leading-relaxed">
                    {category.description}
                  </Text>

                  {/* Stats */}
                  <div className="flex items-center justify-center space-x-3">
                    <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-lg">{category.emoji}</span>
                      <Text className="text-gray-700 text-sm font-semibold">
                        {category.count}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-20 transition-all duration-300 rounded-full"></div>
              </div>

              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  🔥 Popular
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Can't find what you're looking for?
                </h3>
                <p className="text-gray-600">
                  Explore our complete restaurant directory with advanced filters
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="primary"
                  size="large"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none font-bold px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Browse All Restaurants
                </Button>
                <Button
                  size="large"
                  className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold px-8 transition-all duration-300"
                >
                  Advanced Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
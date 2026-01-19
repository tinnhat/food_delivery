"use client";

import { Card, Typography } from "antd";
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
  },
  {
    id: "2",
    name: "Asian",
    icon: "🍜",
    emoji: "🥢",
    color: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
    count: "85+ restaurants",
    description: "Sushi, Noodles & Asian cuisine",
  },
  {
    id: "3",
    name: "Fast Food",
    icon: "🍔",
    emoji: "🚀",
    color: "bg-orange-100 text-orange-600 hover:bg-orange-200",
    count: "95+ restaurants",
    description: "Burgers, Fries & Quick bites",
  },
  {
    id: "4",
    name: "Healthy",
    icon: "🥗",
    emoji: "🌱",
    color: "bg-green-100 text-green-600 hover:bg-green-200",
    count: "60+ restaurants",
    description: "Salads, Smoothies & Healthy options",
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
    <section className="py-12">
      <div className="text-center mb-12">
        <Title level={2} className="mb-4">
          Browse by Category
        </Title>
        <Text className="text-gray-600 text-lg">
          Discover restaurants by your favorite cuisine
        </Text>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            hoverable
            className={`text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
              selectedCategory === category.id
                ? 'border-orange-300 shadow-lg bg-orange-50'
                : 'border-transparent hover:border-gray-200'
            }`}
            bodyStyle={{ padding: "24px" }}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="space-y-3">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${category.color} transition-all duration-300 hover:scale-110 shadow-lg`}>
                <span className="text-3xl">{category.icon}</span>
              </div>

              <div>
                <Title level={4} className="mb-1 text-lg font-semibold">
                  {category.name}
                </Title>
                <Text className="text-gray-500 text-sm block mb-2">
                  {category.description}
                </Text>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">{category.emoji}</span>
                  <Text className="text-gray-600 text-sm font-medium">
                    {category.count}
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-6 py-3 rounded-full border border-orange-200">
          <span className="text-lg">🔥</span>
          <span className="font-medium">New categories added weekly!</span>
        </div>
      </div>
    </section>
  );
}
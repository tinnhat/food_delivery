"use client";

import { Card, Typography, Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { mockFoodItems } from "@/data/mockData";
import { FoodImage } from "@/components/ui/FoodImage";

const { Title, Text } = Typography;

export function PopularDishes() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const popularItems = mockFoodItems.slice(0, 8); // Get first 8 items

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full mb-4">
            <span className="text-lg">🔥</span>
            <span className="font-semibold text-sm">Trending Now</span>
          </div>
          <Title level={2} className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            Popular Dishes
          </Title>
          <Text className="text-gray-600 text-xl max-w-2xl mx-auto">
            Customer favorites that keep our community coming back for more delicious experiences
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularItems.map((item, index) => (
            <Card
              key={item.id}
              hoverable
              className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 rounded-3xl relative group bg-white"
              cover={
                <div className="relative h-56 overflow-hidden rounded-t-3xl group">
                  <FoodImage
                    foodItem={item}
                    className="group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Favorite Button */}
                  <Button
                    type="text"
                    shape="circle"
                    icon={favorites.has(item.id) ?
                      <HeartFilled className="text-red-500 text-2xl" /> :
                      <HeartOutlined className="text-white text-2xl" />
                    }
                    className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 backdrop-blur-sm border-white/30 shadow-lg transition-all duration-300"
                    onClick={() => toggleFavorite(item.id)}
                  />

                  {/* Rating Badge */}
                  {item.rating && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500 text-lg">⭐</span>
                        <span className="font-bold text-gray-800">{item.rating}</span>
                      </div>
                    </div>
                  )}

                  {/* Popular Badge */}
                  {index < 2 && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      🔥 Most Popular
                    </div>
                  )}
                </div>
              }
              bodyStyle={{ padding: "24px" }}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="space-y-4">
                <div>
                  <Title level={4} className="mb-2 text-xl font-bold text-gray-900 hover:text-red-600 transition-colors duration-300">
                    {item.name}
                  </Title>
                  <Text className="text-gray-600 text-sm leading-relaxed block line-clamp-2">
                    {item.description}
                  </Text>
                </div>

                {/* Enhanced Dietary Info */}
                <div className="flex flex-wrap gap-2">
                  {item.isVegetarian && (
                    <div className="inline-flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                      <span className="text-lg">🌱</span>
                      <span>Veg</span>
                    </div>
                  )}
                  {item.isVegan && (
                    <div className="inline-flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                      <span className="text-lg">🌿</span>
                      <span>Vegan</span>
                    </div>
                  )}
                  {item.isSpicy && (
                    <div className="inline-flex items-center space-x-1 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium border border-red-200">
                      <span className="text-lg">🔥</span>
                      <span>Spicy</span>
                    </div>
                  )}
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-gray-900">${item.price}</span>
                    {item.preparationTime && (
                      <span className="text-xs text-gray-500">{item.preparationTime}</span>
                    )}
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    icon={<span className="text-lg mr-2">🛒</span>}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-none font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-50 via-pink-50 to-purple-50 rounded-3xl p-10 border border-red-200 max-w-5xl mx-auto shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="text-center lg:text-left max-w-md">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Explore Our Complete Menu
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Discover thousands of delicious dishes from restaurants near you.
                  From comfort food to exotic cuisines, we have something for everyone.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="primary"
                  size="large"
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-none font-bold px-8 py-4 h-auto rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🍽️ View All Dishes
                </Button>
                <Button
                  size="large"
                  className="border-2 border-red-300 text-red-600 hover:bg-red-50 font-bold px-8 py-4 h-auto rounded-2xl transition-all duration-300"
                >
                  📍 Find by Location
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
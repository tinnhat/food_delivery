"use client";

import { Card, Typography, Button, Tag } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Image from "next/image";
import { useState } from "react";
import { mockFoodItems } from "@/data/mockData";

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
    <section className="py-12">
      <div className="text-center mb-12">
        <Title level={2} className="mb-4">
          Popular Dishes
        </Title>
        <Text className="text-gray-600 text-lg">
          Customer favorites you can&apos;t miss
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularItems.map((item) => (
          <Card
            key={item.id}
            hoverable
            className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl"
            cover={
              <div className="relative h-48 group">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Favorite Button */}
                <Button
                  type="text"
                  shape="circle"
                  icon={favorites.has(item.id) ?
                    <HeartFilled className="text-red-500 text-xl" /> :
                    <HeartOutlined className="text-white text-xl" />
                  }
                  className="absolute top-3 right-3 bg-black/20 hover:bg-black/40 border-white/30 shadow-lg"
                  onClick={() => toggleFavorite(item.id)}
                />

                {/* Rating Badge */}
                {item.rating && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="font-semibold text-gray-800 text-sm">{item.rating}</span>
                    </div>
                  </div>
                )}
              </div>
            }
            bodyStyle={{ padding: "20px" }}
          >
            <div className="space-y-3">
              <div>
                <Title level={4} className="mb-1 text-lg font-bold leading-tight">
                  {item.name}
                </Title>
                <Text className="text-gray-600 text-sm leading-relaxed block line-clamp-2">
                  {item.description}
                </Text>
              </div>

              {/* Dietary Info */}
              <div className="flex flex-wrap gap-1">
                {item.isVegetarian && (
                  <Tag className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-0.5 rounded-md">
                    🌱 Veg
                  </Tag>
                )}
                {item.isVegan && (
                  <Tag className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-0.5 rounded-md">
                    🌿 Vegan
                  </Tag>
                )}
                {item.isSpicy && (
                  <Tag className="bg-red-50 text-red-700 border-red-200 text-xs px-2 py-0.5 rounded-md">
                    🔥 Spicy
                  </Tag>
                )}
              </div>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xl font-bold text-gray-900">${item.price}</span>
                <Button
                  type="primary"
                  size="small"
                  icon={<span className="text-sm">🛒</span>}
                  className="bg-orange-500 hover:bg-orange-600 border-orange-500"
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100 max-w-4xl mx-auto">
          <Title level={3} className="mb-4">
            Explore More Delicious Options
          </Title>
          <Text className="text-gray-600 mb-6 block">
            Discover thousands of dishes from restaurants near you
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button type="primary" size="large" className="bg-orange-500 hover:bg-orange-600">
              View All Dishes
            </Button>
            <Button type="default" size="large">
              Browse by Restaurant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
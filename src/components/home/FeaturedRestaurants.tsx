"use client";

import { Card, Typography, Tag, Button, Spin } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Restaurant } from "@/types";
import { mockRestaurantService } from "@/lib/mockApi";

const { Title, Text } = Typography;

export function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await mockRestaurantService.getRestaurants({ $limit: 6 });
      setRestaurants(response.data);
    } catch (error: any) {
      console.error('Failed to fetch restaurants:', error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <Title level={2} className="mb-2 text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
              Featured Restaurants
            </Title>
            <Text className="text-gray-600 text-xl">
              Handpicked restaurants loved by our customers
            </Text>
          </div>
          <Link href="/restaurants">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Restaurants →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.slice(0, 6).map((restaurant: Restaurant, index: number) => (
            <Card
              key={restaurant.id}
              hoverable
              className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 rounded-3xl relative group"
              cover={
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"}
                    alt={restaurant.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-restaurant.jpg'; // Fallback image
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <Tag
                      color={restaurant.isOpen ? "success" : "error"}
                      className="px-4 py-2 text-sm font-bold bg-white/90 backdrop-blur-sm border-0 shadow-lg"
                    >
                      {restaurant.isOpen ? "🟢 Open Now" : "🔴 Closed"}
                    </Tag>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <span className="font-bold text-gray-800">{restaurant.rating}</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-2">
                      <Button
                        type="text"
                        shape="circle"
                        size="large"
                        className="bg-white/20 hover:bg-white/40 backdrop-blur-sm border-white/30 shadow-lg"
                        icon={<span className="text-2xl">❤️</span>}
                      />
                      <Button
                        type="text"
                        shape="circle"
                        size="large"
                        className="bg-white/20 hover:bg-white/40 backdrop-blur-sm border-white/30 shadow-lg"
                        icon={<span className="text-2xl">📍</span>}
                      />
                    </div>
                  </div>
                </div>
              }
              bodyStyle={{ padding: "28px" }}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              <div className="space-y-4">
                <div>
                  <Title level={3} className="mb-2 text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors duration-300">
                    {restaurant.name}
                  </Title>
                  <Text className="text-gray-600 text-base leading-relaxed block line-clamp-2">
                    {restaurant.description}
                  </Text>
                </div>

                {/* Delivery Info Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                        <ClockCircleOutlined className="text-white text-lg" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{restaurant.deliveryTime}</div>
                        <div className="text-xs text-gray-600">Delivery</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">$</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">${restaurant.deliveryFee}</div>
                        <div className="text-xs text-gray-600">Delivery Fee</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cuisine Tags */}
                <div className="flex flex-wrap gap-2">
                  {(restaurant.cuisine || []).map((cuisine: string) => (
                    <Tag
                      key={cuisine}
                      className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-300 px-3 py-1 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {cuisine}
                    </Tag>
                  ))}
                </div>

                {/* Action Button */}
                <Link href={`/restaurants/${restaurant.id}`}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none font-bold text-white h-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    🍽️ Order Now • View Menu
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-3xl p-10 border border-orange-200 max-w-5xl mx-auto shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="text-center lg:text-left max-w-md">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Discover More Amazing Restaurants
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Explore our complete directory of restaurants with advanced filters,
                  ratings, and reviews to find your perfect meal.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="primary"
                  size="large"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none font-bold px-8 py-4 h-auto rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🏪 Browse All Restaurants
                </Button>
                <Button
                  size="large"
                  className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 font-bold px-8 py-4 h-auto rounded-2xl transition-all duration-300"
                >
                  🔍 Advanced Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
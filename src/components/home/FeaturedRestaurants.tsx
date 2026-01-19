"use client";

import { Card, Typography, Tag, Button } from "antd";
import { ClockCircleOutlined, DollarOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { mockRestaurants } from "@/data/mockData";

const { Title, Text } = Typography;

export function FeaturedRestaurants() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <Title level={2} className="mb-2">
            Featured Restaurants
          </Title>
          <Text className="text-gray-600 text-lg">
            Handpicked restaurants loved by our customers
          </Text>
        </div>
        <Link href="/restaurants">
          <Button
            type="primary"
            size="large"
            className="bg-orange-500 hover:bg-orange-600 border-orange-500"
          >
            View All Restaurants →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockRestaurants.slice(0, 6).map((restaurant) => (
          <Card
            key={restaurant.id}
            hoverable
            className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl"
            cover={
              <div className="relative h-56 group">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <Tag
                    color={restaurant.isOpen ? "success" : "error"}
                    className="px-3 py-1 text-sm font-medium bg-white/90"
                  >
                    {restaurant.isOpen ? "🟢 Open" : "🔴 Closed"}
                  </Tag>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="font-semibold text-gray-800 text-sm">{restaurant.rating}</span>
                  </div>
                </div>
              </div>
            }
            bodyStyle={{ padding: "24px" }}
          >
            <div className="space-y-4">
              <div>
                <Title level={3} className="mb-2 text-xl font-bold">
                  {restaurant.name}
                </Title>
                <Text className="text-gray-600 text-sm leading-relaxed block line-clamp-2">
                  {restaurant.description}
                </Text>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-600">
                    <ClockCircleOutlined className="mr-2 text-orange-500" />
                    <span className="text-sm font-medium">{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarOutlined className="mr-2 text-green-500" />
                    <span className="text-sm font-medium">${restaurant.deliveryFee}</span>
                  </div>
                </div>
              </div>

              {/* Cuisine Tags */}
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map((cuisine) => (
                  <Tag
                    key={cuisine}
                    className="bg-orange-50 text-orange-700 border-orange-200 px-3 py-1 rounded-full text-xs font-medium"
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
                  className="bg-orange-500 hover:bg-orange-600 border-orange-500 font-semibold h-12 rounded-xl"
                >
                  Order Now • View Menu
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100 max-w-4xl mx-auto">
          <Title level={3} className="mb-4">
            Can&apos;t find what you&apos;re looking for?
          </Title>
          <Text className="text-gray-600 mb-6 block">
            Browse our complete restaurant directory with advanced filters
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/restaurants">
              <Button type="primary" size="large" className="bg-orange-500 hover:bg-orange-600">
                Browse All Restaurants
              </Button>
            </Link>
            <Button type="default" size="large">
              Advanced Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
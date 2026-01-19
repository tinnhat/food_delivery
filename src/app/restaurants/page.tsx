"use client";

import { useEffect, useState } from 'react';
import { Card, Typography, Button, Spin, Empty, Pagination, Rate, Tag } from 'antd';
import { ClockCircleOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { Restaurant } from '@/types';
import { mockRestaurantService } from '@/lib/mockApi';

const { Title, Text } = Typography;

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    fetchRestaurants();
  }, [currentPage]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await mockRestaurantService.getRestaurants({
        $limit: pageSize,
        $skip: (currentPage - 1) * pageSize
      });

      setRestaurants(response.data);
      setTotal(response.total || response.data.length);
    } catch (error: any) {
      console.error('Failed to fetch restaurants:', error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Title level={2}>All Restaurants</Title>
          <Text className="text-gray-600">
            Discover amazing restaurants in your area
          </Text>
        </div>

        {restaurants.length === 0 ? (
          <Card>
            <Empty
              description="No restaurants found"
              image={<span className="text-6xl">🏪</span>}
            >
              <Text className="text-gray-500 block mb-4">
                Restaurants will appear here once they join our platform.
              </Text>
            </Empty>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {restaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  hoverable
                  className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  cover={
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      {/* Rating Badge */}
                      {restaurant.rating && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                          <div className="flex items-center space-x-1">
                            <Rate disabled defaultValue={restaurant.rating} className="text-xs" />
                            <span className="font-bold text-gray-800 ml-1">{restaurant.rating}</span>
                          </div>
                        </div>
                      )}

                      {/* Open/Closed Status */}
                      <div className="absolute top-3 right-3">
                        <Tag color={restaurant.isOpen ? "green" : "red"} className="font-semibold">
                          {restaurant.isOpen ? "Open" : "Closed"}
                        </Tag>
                      </div>
                    </div>
                  }
                  actions={[
                    <Link key="view" href={`/restaurants/${restaurant.id}`}>
                      <Button type="primary" block>
                        View Menu
                      </Button>
                    </Link>
                  ]}
                >
                  <div className="p-4">
                    <Title level={4} className="mb-2 line-clamp-1">
                      {restaurant.name}
                    </Title>

                    <Text className="text-gray-600 mb-3 block line-clamp-2">
                      {restaurant.description}
                    </Text>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <EnvironmentOutlined />
                        <span>{restaurant.cuisine?.join(", ") || "Various"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <ClockCircleOutlined />
                        <span>{restaurant.deliveryTime || "25-35 min"}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarOutlined />
                        <span>From ${restaurant.deliveryFee || 2.99}</span>
                      </div>
                    </div>

                    {restaurant.address && (
                      <div className="mt-2 text-xs text-gray-500">
                        📍 {restaurant.address}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <Pagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} restaurants`
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
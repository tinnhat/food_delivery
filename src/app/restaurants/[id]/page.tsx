"use client";

import { useEffect, useState } from 'react';
import { Card, Typography, Button, Spin, Empty, Rate, Tag, Input, message, Badge } from 'antd';
import { ClockCircleOutlined, DollarOutlined, EnvironmentOutlined, ShoppingCartOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Restaurant, Meal } from '@/types';
import { mockRestaurantService, mockMealService } from '@/lib/mockApi';
import { useCart } from '@/contexts/CartContext';
import { FoodImage } from '@/components/ui/FoodImage';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurantId = params.id as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const { addItem, getItemQuantity, isInCart } = useCart();

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantData();
    }
  }, [restaurantId]);

  useEffect(() => {
    // Filter meals based on search query
    if (searchQuery.trim() === '') {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter(meal =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMeals(filtered);
    }
  }, [meals, searchQuery]);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);

      // Fetch restaurant details
      const restaurantResponse = await mockRestaurantService.getRestaurant(restaurantId);
      setRestaurant(restaurantResponse);

      // Fetch meals for this restaurant
      const mealsResponse = await mockMealService.getMealsByRestaurant(restaurantId);
      setMeals(mealsResponse.data);
      setFilteredMeals(mealsResponse.data);

    } catch (error: any) {
      console.error('Failed to fetch restaurant data:', error);
      message.error('Failed to load restaurant information');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (meal: Meal) => {
    const foodItem = {
      id: meal.id,
      name: meal.name,
      description: meal.description,
      price: meal.price,
      image: meal.image || '',
      category: meal.category || 'Main Course',
      isVegetarian: meal.isVegetarian || false,
      isVegan: meal.isVegan || false,
      isSpicy: meal.isSpicy || false,
      restaurantId: meal.restaurantId,
      rating: meal.rating,
      preparationTime: meal.preparationTime,
      imageAlt: meal.name,
    };

    addItem(foodItem, 1);
    message.success(`${meal.name} added to cart!`);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Card>
            <Empty
              description="Restaurant not found"
              image={<span className="text-6xl">🏪</span>}
            >
              <Text className="text-gray-500 block mb-4">
                The restaurant you're looking for doesn't exist or has been removed.
              </Text>
            </Empty>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 w-full">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-xl overflow-hidden flex-shrink-0">
              <Image
                src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=128&h=128&fit=crop"}
                alt={restaurant.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-white">
              <Title level={1} className="text-white mb-2">
                {restaurant.name}
              </Title>
              <Paragraph className="text-white/90 mb-4 max-w-2xl">
                {restaurant.description}
              </Paragraph>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Rate disabled defaultValue={restaurant.rating || 4.5} className="text-orange-300" />
                  <span className="font-semibold">{restaurant.rating || 4.5}</span>
                </div>

                <Tag color={restaurant.isOpen ? "green" : "red"} className="font-semibold">
                  {restaurant.isOpen ? "Open" : "Closed"}
                </Tag>

                <div className="flex items-center space-x-1">
                  <ClockCircleOutlined />
                  <span>{restaurant.deliveryTime || "25-35 min"}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <DollarOutlined />
                  <span>Delivery ${restaurant.deliveryFee || 2.99}</span>
                </div>
              </div>

              {restaurant.address && (
                <div className="flex items-center space-x-1 mt-2">
                  <EnvironmentOutlined />
                  <span className="text-sm">{restaurant.address}</span>
                </div>
              )}

              {restaurant.cuisine && restaurant.cuisine.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {restaurant.cuisine.map((cuisine, index) => (
                    <Tag key={index} color="orange">{cuisine}</Tag>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Title level={2}>Menu</Title>

          {/* Search */}
          <div className="mt-4 max-w-md">
            <Search
              placeholder="Search menu items..."
              onSearch={handleSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="large"
            />
          </div>
        </div>

        {filteredMeals.length === 0 ? (
          <Card>
            <Empty
              description={searchQuery ? "No items match your search" : "No menu items available"}
              image={<span className="text-6xl">🍽️</span>}
            >
              {searchQuery && (
                <Button onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              )}
            </Empty>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => {
              const quantity = getItemQuantity(meal.id);
              const inCart = isInCart(meal.id);

              return (
                <Card
                  key={meal.id}
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                  cover={
                    <div className="relative h-48">
                      <FoodImage
                        foodItem={{
                          id: meal.id,
                          name: meal.name,
                          description: meal.description,
                          image: meal.image || '',
                          price: meal.price,
                          category: meal.category || 'Main Course',
                          isVegetarian: meal.isVegetarian || false,
                          isVegan: meal.isVegan || false,
                          isSpicy: meal.isSpicy || false,
                          restaurantId: meal.restaurantId,
                          imageAlt: meal.name,
                        }}
                        className="rounded-t-lg"
                      />

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {meal.isVegetarian && (
                          <Tag color="green" className="font-semibold">🌱 Vegetarian</Tag>
                        )}
                        {meal.isVegan && (
                          <Tag color="lime" className="font-semibold">🌿 Vegan</Tag>
                        )}
                        {meal.isSpicy && (
                          <Tag color="red" className="font-semibold">🔥 Spicy</Tag>
                        )}
                      </div>

                      {/* Rating */}
                      {meal.rating && (
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                          <div className="flex items-center space-x-1">
                            <Rate disabled defaultValue={meal.rating} className="text-xs" />
                            <span className="font-bold text-gray-800 text-xs">{meal.rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                >
                  <div className="p-4">
                    <Title level={4} className="mb-2 line-clamp-1">
                      {meal.name}
                    </Title>

                    <Text className="text-gray-600 mb-3 block line-clamp-2">
                      {meal.description}
                    </Text>

                    {meal.preparationTime && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                        <ClockCircleOutlined />
                        <span>{meal.preparationTime}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">
                        ${meal.price.toFixed(2)}
                      </div>

                      {inCart ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="small"
                            icon={<MinusOutlined />}
                            onClick={() => {
                              if (quantity > 1) {
                                // Decrease quantity logic would go here
                                // For now, we'll just remove and re-add with less quantity
                                handleAddToCart({ ...meal, price: -meal.price });
                              }
                            }}
                          />
                          <Badge count={quantity} showZero>
                            <ShoppingCartOutlined className="text-orange-500" />
                          </Badge>
                          <Button
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={() => handleAddToCart(meal)}
                          />
                        </div>
                      ) : (
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => handleAddToCart(meal)}
                          className="bg-orange-500 hover:bg-orange-600 border-none"
                        >
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
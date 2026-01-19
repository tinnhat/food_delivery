"use client";

import { useEffect, useState } from 'react';
import { Card, Typography, Button, Tabs, message, Spin, Empty, Statistic, Row, Col } from 'antd';
import { PlusOutlined, ShopOutlined, FileTextOutlined, ShoppingCartOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { Restaurant, Meal, Order } from '@/types';
import { mockRestaurantService, mockMealService, mockOrderService } from '@/lib/mockApi';
import Link from 'next/link';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function RestaurantDashboard() {
  // Always call hooks at the top level - follows Rules of Hooks
  const auth = useAuth();
  const [mounted, setMounted] = useState(false);

  // Safely access context values
  const user = auth?.user || null;
  const isAuthenticated = auth?.isAuthenticated || false;
  const isOwner = auth?.isOwner || false;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR to avoid context issues
  if (typeof window === 'undefined' || !mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && isOwner) {
      fetchRestaurantData();
    }
  }, [isAuthenticated, isOwner]);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);

      // Fetch restaurant (assuming owner has one restaurant for simplicity)
      const restaurantsResponse = await mockRestaurantService.getRestaurants();
      if (restaurantsResponse.data.length > 0) {
        setRestaurant(restaurantsResponse.data[0]);
        const restaurantId = restaurantsResponse.data[0].id;

        // Fetch meals for this restaurant
        const mealsResponse = await mockMealService.getMealsByRestaurant(restaurantId);
        setMeals(mealsResponse.data);

        // Fetch orders for this restaurant
        const ordersResponse = await mockOrderService.getUserOrders();
        setOrders(ordersResponse);
      }
    } catch (error: any) {
      message.error('Failed to load restaurant data');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !isOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="text-center max-w-md">
          <Title level={3}>Access Denied</Title>
          <Text className="block mb-4">You need to be signed in as a restaurant owner to access this page.</Text>
          <Link href="/auth">
            <Button type="primary" size="large">
              Sign In
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

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
              description="You haven't created a restaurant yet"
              image={<ShopOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
            >
              <Link href="/restaurant/setup">
                <Button type="primary" size="large">
                  Create Restaurant
                </Button>
              </Link>
            </Empty>
          </Card>
        </div>
      </div>
    );
  }

  const stats = {
    totalMeals: meals.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'placed' || o.status === 'processing').length,
    revenue: orders
      .filter(o => o.status === 'delivered' || o.status === 'received')
      .reduce((sum, order) => sum + order.totalAmount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Title level={2}>Restaurant Dashboard</Title>
          <Text className="text-gray-600">
            Manage your restaurant, menu, and orders
          </Text>
        </div>

        {/* Restaurant Info */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Title level={3} className="m-0">{restaurant.name}</Title>
              <Text className="text-gray-600">{restaurant.description}</Text>
              <div className="mt-2">
                <Text className="text-sm text-gray-500">Cuisine: {restaurant.cuisine?.join(", ") || "Various"}</Text>
              </div>
            </div>
            <Button type="primary" icon={<PlusOutlined />}>
              Edit Restaurant
            </Button>
          </div>
        </Card>

        {/* Statistics */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Meals"
                value={stats.totalMeals}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Orders"
                value={stats.totalOrders}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Pending Orders"
                value={stats.pendingOrders}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Revenue"
                value={stats.revenue}
                prefix="$"
                precision={2}
              />
            </Card>
          </Col>
        </Row>

        {/* Tabs for different sections */}
        <Card>
          <Tabs defaultActiveKey="meals">
            <TabPane tab="Menu Items" key="meals">
              <div className="flex justify-between items-center mb-4">
                <Title level={4}>Your Menu</Title>
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Meal
                </Button>
              </div>

              {meals.length === 0 ? (
                <Empty description="No meals added yet">
                  <Button type="primary">Add Your First Meal</Button>
                </Empty>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {meals.map((meal) => (
                    <Card key={meal.id} size="small" className="shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Text className="font-semibold">{meal.name}</Text>
                          <div className="mt-1">
                            <Text className="text-gray-600">{meal.description}</Text>
                          </div>
                          <div className="mt-2">
                            <Text className="text-lg font-bold text-green-600">
                              ${meal.price.toFixed(2)}
                            </Text>
                          </div>
                        </div>
                        <Button size="small" type="text">
                          Edit
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabPane>

            <TabPane tab="Orders" key="orders">
              <div className="mb-4">
                <Title level={4}>Recent Orders</Title>
              </div>

              {orders.length === 0 ? (
                <Empty description="No orders yet">
                  <Text className="text-gray-500">Orders will appear here once customers start ordering</Text>
                </Empty>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 10).map((order) => (
                    <Card key={order.id} size="small">
                      <div className="flex justify-between items-center">
                        <div>
                          <Text className="font-semibold">Order #{order.id.slice(-8)}</Text>
                          <div className="mt-1">
                            <Text className="text-sm text-gray-600">
                              {order.orderitems.length} items • ${order.totalAmount.toFixed(2)}
                            </Text>
                          </div>
                          <div className="mt-1">
                            <Text className="text-xs text-gray-500">
                              {new Date(order.createdAt || '').toLocaleDateString()}
                            </Text>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${
                            order.status === 'delivered' || order.status === 'received'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'canceled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </div>
                          <Button size="small" type="link" className="mt-1 p-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabPane>

            <TabPane tab="Settings" key="settings">
              <div className="space-y-4">
                <Card title="Restaurant Settings" size="small">
                  <p>Configure your restaurant hours, delivery settings, and more.</p>
                  <Button type="primary" className="mt-2">Edit Settings</Button>
                </Card>

                <Card title="Blocked Users" size="small">
                  <p>Manage users who are blocked from ordering at your restaurant.</p>
                  <Button className="mt-2">View Blocked Users</Button>
                </Card>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
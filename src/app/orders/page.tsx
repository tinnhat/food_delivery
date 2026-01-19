"use client";

import { useEffect, useState } from 'react';
import { Card, Typography, List, Tag, Button, Empty, Spin, message } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CarOutlined, DollarOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/types';
import { mockOrderService } from '@/lib/mockApi';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function OrdersPage() {
  // Always call hooks at the top level - follows Rules of Hooks
  const auth = useAuth();
  const [mounted, setMounted] = useState(false);

  // Safely access context values
  const user = auth?.user || null;
  const isAuthenticated = auth?.isAuthenticated || false;

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

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userOrders = await mockOrderService.getUserOrders();
      setOrders(userOrders);
    } catch (error: any) {
      message.error('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'placed': return 'orange';
      case 'processing': return 'blue';
      case 'in_route': return 'purple';
      case 'delivered': return 'green';
      case 'received': return 'green';
      case 'canceled': return 'red';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'placed': return <ClockCircleOutlined />;
      case 'processing': return <ClockCircleOutlined />;
      case 'in_route': return <CarOutlined />;
      case 'delivered': return <CheckCircleOutlined />;
      case 'received': return <CheckCircleOutlined />;
      case 'canceled': return <ClockCircleOutlined />;
      default: return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="text-center max-w-md">
          <Title level={3}>Sign In Required</Title>
          <Text className="block mb-4">Please sign in to view your orders.</Text>
          <Link href="/auth">
            <Button type="primary" size="large">
              Sign In
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Title level={2}>My Orders</Title>
          <Text className="text-gray-600">
            Track your food orders and order history
          </Text>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <Empty
              description="No orders found"
              image={<span className="text-6xl">🍽️</span>}
            >
              <Link href="/">
                <Button type="primary" size="large">
                  Start Ordering
                </Button>
              </Link>
            </Empty>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="shadow-md">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <Title level={4} className="m-0">
                        Order #{order.id.slice(-8)}
                      </Title>
                      <Tag
                        color={getStatusColor(order.status)}
                        icon={getStatusIcon(order.status)}
                      >
                        {order.status.replace('_', ' ').toUpperCase()}
                      </Tag>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <Text className="text-gray-500">Total Amount</Text>
                        <div className="flex items-center space-x-2">
                          <DollarOutlined />
                          <Text className="font-semibold">${order.totalAmount.toFixed(2)}</Text>
                        </div>
                      </div>

                      <div>
                        <Text className="text-gray-500">Items</Text>
                        <Text className="font-semibold">{order.orderitems.length} items</Text>
                      </div>

                      <div>
                        <Text className="text-gray-500">Order Date</Text>
                        <Text className="font-semibold">
                          {new Date(order.createdAt || '').toLocaleDateString()}
                        </Text>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Text className="text-gray-500">Items:</Text>
                      <div className="mt-2">
                        <List
                          size="small"
                          dataSource={order.orderitems}
                          renderItem={(item: any) => (
                            <List.Item className="px-0">
                              <div className="flex justify-between items-center w-full">
                                <Text>{item.meal?.name || `Meal ${item.mealId}`}</Text>
                                <Text className="text-gray-600">
                                  {item.quantity}x ${item.price.toFixed(2)}
                                </Text>
                              </div>
                            </List.Item>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <Button type="primary" size="large">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
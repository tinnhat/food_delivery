"use client";

import { useState, useEffect } from 'react';
import { Card, Typography, Button, List, Input, message, Empty, Divider, Form, Radio, Space, Modal, Spin } from 'antd';
import { DeleteOutlined, PlusOutlined, MinusOutlined, ShoppingCartOutlined, EnvironmentOutlined, CreditCardOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrderService } from '@/lib/mockApi';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function CartPage() {
  // Always call hooks at the top level - follows Rules of Hooks
  const cart = useCart();
  const auth = useAuth();
  const [mounted, setMounted] = useState(false);

  // Safely access context values
  const items = cart?.items || [];
  const total = cart?.total || 0;
  const itemCount = cart?.itemCount || 0;
  const updateQuantity = cart?.updateQuantity || (() => {});
  const removeItem = cart?.removeItem || (() => {});
  const clearCart = cart?.clearCart || (() => {});
  const updateInstructions = cart?.updateInstructions || (() => {});
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

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [form] = Form.useForm();

  const deliveryFee = total > 25 ? 0 : 2.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + deliveryFee + tax;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleInstructionsChange = (itemId: string, instructions: string) => {
    updateInstructions(itemId, instructions);
  };

  const handleCheckout = async (values: any) => {
    if (!isAuthenticated) {
      message.warning('Please log in to place an order');
      return;
    }

    if (items.length === 0) {
      message.warning('Your cart is empty');
      return;
    }

    try {
      setCheckoutLoading(true);

      // Get the restaurant ID from the first item (assuming single restaurant order)
      const restaurantId = items[0].foodItem.restaurantId;

      // Prepare order items
      const orderItems = items.map(item => ({
        mealId: item.foodItem.id,
        quantity: item.quantity,
        price: item.foodItem.price,
      }));

      // Create the order
      const orderData = {
        restaurantId,
        orderitems: orderItems,
        totalAmount: finalTotal,
      };

      const order = await mockOrderService.createOrder(orderData);

      message.success('Order placed successfully!');
      clearCart();
      setShowCheckoutModal(false);

      // Redirect to order confirmation page
      // For now, just show success message

    } catch (error: any) {
      message.error(error.message || 'Failed to place order');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <Empty
            image={<ShoppingCartOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
            description={
              <div>
                <Title level={3}>Your cart is empty</Title>
                <Text className="text-gray-500">Add some delicious food to get started!</Text>
              </div>
            }
          >
            <Link href="/restaurants">
              <Button type="primary" size="large">
                Browse Restaurants
              </Button>
            </Link>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Title level={2}>Shopping Cart</Title>
          <Text className="text-gray-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card title={`Cart Items (${itemCount})`} className="shadow-lg">
              <List
                dataSource={items}
                renderItem={(item) => (
                  <List.Item className="px-0 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex space-x-4 w-full">
                      {/* Item Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.foodItem.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop"}
                          alt={item.foodItem.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <Title level={5} className="mb-1 line-clamp-1">
                          {item.foodItem.name}
                        </Title>
                        <Text className="text-gray-600 text-sm block mb-2 line-clamp-2">
                          {item.foodItem.description}
                        </Text>

                        <div className="flex items-center space-x-2 mb-2">
                          {item.foodItem.isVegetarian && <span className="text-green-600 text-xs">🌱 Vegetarian</span>}
                          {item.foodItem.isVegan && <span className="text-lime-600 text-xs">🌿 Vegan</span>}
                          {item.foodItem.isSpicy && <span className="text-red-600 text-xs">🔥 Spicy</span>}
                        </div>

                        {/* Special Instructions */}
                        <div className="mb-2">
                          <Text className="text-xs text-gray-500">Special Instructions:</Text>
                          <TextArea
                            placeholder="Any special requests..."
                            value={item.specialInstructions || ''}
                            onChange={(e) => handleInstructionsChange(item.foodItem.id, e.target.value)}
                            rows={2}
                            className="mt-1"
                            maxLength={200}
                          />
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="small"
                            icon={<MinusOutlined />}
                            onClick={() => handleQuantityChange(item.foodItem.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          />
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={() => handleQuantityChange(item.foodItem.id, item.quantity + 1)}
                          />
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            ${(item.foodItem.price * item.quantity).toFixed(2)}
                          </div>
                          <Button
                            type="text"
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => removeItem(item.foodItem.id)}
                            className="mt-1"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button
                  danger
                  onClick={() => {
                    Modal.confirm({
                      title: 'Clear Cart',
                      content: 'Are you sure you want to remove all items from your cart?',
                      onOk: clearCart,
                    });
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card title="Order Summary" className="shadow-lg sticky top-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Divider className="my-2" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">${finalTotal.toFixed(2)}</span>
                </div>

                {total < 25 && (
                  <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                    Add ${(25 - total).toFixed(2)} more for free delivery!
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={() => setShowCheckoutModal(true)}
                  disabled={!isAuthenticated}
                  className="bg-orange-500 hover:bg-orange-600 border-none"
                >
                  Proceed to Checkout
                </Button>

                {!isAuthenticated && (
                  <div className="text-center">
                    <Text className="text-gray-500 text-sm">
                      Please <Link href="/auth" className="text-orange-500">sign in</Link> to checkout
                    </Text>
                  </div>
                )}

                <Link href="/restaurants">
                  <Button block size="large">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Checkout Modal */}
        <Modal
          title="Checkout"
          open={showCheckoutModal}
          onCancel={() => setShowCheckoutModal(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            onFinish={handleCheckout}
            layout="vertical"
          >
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Title level={4}>Order Summary</Title>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Items ({itemCount})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Form.Item
                name="deliveryAddress"
                label="Delivery Address"
                rules={[{ required: true, message: 'Please enter delivery address' }]}
              >
                <Input.TextArea
                  placeholder="Enter your full delivery address"
                  rows={3}
                />
              </Form.Item>

              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[{ required: true, message: 'Please select payment method' }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="card">
                      <div className="flex items-center space-x-2">
                        <CreditCardOutlined />
                        <span>Credit/Debit Card</span>
                      </div>
                    </Radio>
                    <Radio value="cash">
                      <div className="flex items-center space-x-2">
                        <span>💵</span>
                        <span>Cash on Delivery</span>
                      </div>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="phone"
                label="Contact Phone"
                rules={[
                  { required: true, message: 'Please enter phone number' },
                  { pattern: /^\+?[\d\s\-\(\)]+$/, message: 'Please enter a valid phone number' }
                ]}
              >
                <Input placeholder="Your phone number" />
              </Form.Item>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button onClick={() => setShowCheckoutModal(false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={checkoutLoading}
                className="bg-orange-500 hover:bg-orange-600 border-none"
              >
                Place Order
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
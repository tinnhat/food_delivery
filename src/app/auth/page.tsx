"use client";

import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Tabs, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, ShopOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [accountType, setAccountType] = useState<'user' | 'owner'>('user');
  const router = useRouter();

  // Always call hooks at the top level - follows Rules of Hooks
  const auth = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle case where context might not be available during SSR
  const login = auth?.login || (async () => {});
  const signup = auth?.signup || (async () => {});

  // Don't render anything during SSR to avoid context issues
  if (typeof window === 'undefined' || !mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.username, values.password);
      message.success('Login successful!');
      router.push('/');
    } catch (error: any) {
      message.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      await signup(values.username, values.password, accountType);
      message.success('Account created successfully!');
      router.push('/');
    } catch (error: any) {
      message.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🍽️</span>
          </div>
          <Title level={2} className="text-gray-800 mb-2">
            Welcome to FoodFlow
          </Title>
          <Text className="text-gray-600">
            Sign in to your account or create a new one
          </Text>
        </div>

        <Tabs defaultActiveKey="login" centered>
          <TabPane tab="Sign In" key="login">
            <Form
              name="login"
              onFinish={handleLogin}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please enter your username' },
                  { min: 3, message: 'Username must be at least 3 characters' }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Username"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter your password' },
                  { min: 6, message: 'Password must be at least 6 characters' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Password"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="bg-gradient-to-r from-orange-500 to-red-500 border-none rounded-lg h-12 font-semibold"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Sign Up" key="signup">
            <Form
              name="signup"
              onFinish={handleSignup}
              layout="vertical"
              size="large"
            >
              <div className="text-center mb-4">
                <Text className="text-sm text-gray-600">
                  Selected: <span className="font-semibold text-orange-600">
                    {accountType === 'user' ? 'Customer Account' : 'Restaurant Owner Account'}
                  </span>
                </Text>
              </div>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please enter a username' },
                  { min: 3, message: 'Username must be at least 3 characters' },
                  { max: 50, message: 'Username must be less than 50 characters' }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Choose a username"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter a password' },
                  { min: 6, message: 'Password must be at least 6 characters' },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Create a password"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                rules={[{ required: true, message: 'Please select account type' }]}
              >
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type={accountType === 'user' ? 'primary' : 'default'}
                    className={`flex items-center justify-center space-x-2 h-12 rounded-lg border-2 ${
                      accountType === 'user'
                        ? 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600'
                        : 'hover:border-orange-300'
                    }`}
                    onClick={() => setAccountType('user')}
                  >
                    <UserOutlined />
                    <span>Customer</span>
                  </Button>
                  <Button
                    type={accountType === 'owner' ? 'primary' : 'default'}
                    className={`flex items-center justify-center space-x-2 h-12 rounded-lg border-2 ${
                      accountType === 'owner'
                        ? 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600'
                        : 'hover:border-orange-300'
                    }`}
                    onClick={() => setAccountType('owner')}
                  >
                    <ShopOutlined />
                    <span>Restaurant</span>
                  </Button>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="bg-gradient-to-r from-orange-500 to-red-500 border-none rounded-lg h-12 font-semibold"
                >
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>

        <Divider className="my-6" />

        <div className="text-center">
          <Text className="text-gray-500 text-sm">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Text>
        </div>
      </Card>
    </div>
  );
}
"use client";

import { useEffect, useState } from 'react';
import { Card, Typography, Button, Tabs, Table, message, Modal, Input, Space, Tag, Avatar, List, Empty, Statistic, Row, Col, Spin } from 'antd';
import { UserOutlined, ShoppingCartOutlined, BlockOutlined, EyeOutlined, DeleteOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { User, Order } from '@/types';
import { mockUsers, mockOrders } from '@/data/mockData';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

interface BlockedUser {
  id: string;
  blockedUserId?: string;
  name: string;
  email: string;
  permissions?: string;
  blockedAt?: string;
  blockedBy?: string;
}

export default function AdminPanel() {
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

  const [activeTab, setActiveTab] = useState('users');

  // Users tab state
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');

  // Orders tab state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Blocked users tab state
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [blockedUsersLoading, setBlockedUsersLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && isOwner) {
      if (activeTab === 'users') fetchUsers();
      else if (activeTab === 'orders') fetchOrders();
      else if (activeTab === 'blocked') fetchBlockedUsers();
    }
  }, [isAuthenticated, isOwner, activeTab]);

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(mockUsers);
    } catch (error: any) {
      message.error('Failed to fetch users');
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrders(mockOrders);
    } catch (error: any) {
      message.error('Failed to fetch orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchBlockedUsers = async () => {
    try {
      setBlockedUsersLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // For mock data, we'll show some users as "blocked"
      const blocked = mockUsers.slice(0, 2).map(user => ({
        ...user,
        blockedAt: new Date().toISOString(),
        blockedBy: 'admin'
      }));
      setBlockedUsers(blocked);
    } catch (error: any) {
      message.error('Failed to fetch blocked users');
    } finally {
      setBlockedUsersLoading(false);
    }
  };

  const handleBlockUser = async (userId: string, email: string) => {
    confirm({
      title: 'Block User',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to block ${email}? They will not be able to order from your restaurant.`,
      onOk: async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          message.success('User blocked successfully');
          fetchBlockedUsers(); // Refresh the list
        } catch (error: any) {
          message.error('Failed to block user');
        }
      },
    });
  };

  const handleUnblockUser = async (blockedUserId: string, email: string) => {
    confirm({
      title: 'Unblock User',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to unblock ${email}? They will be able to order from your restaurant again.`,
      onOk: async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          message.success('User unblocked successfully');
          fetchBlockedUsers(); // Refresh the list
        } catch (error: any) {
          message.error('Failed to unblock user');
        }
      },
    });
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

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

  if (!isAuthenticated || !isOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="text-center max-w-md">
          <Title level={3}>Access Denied</Title>
          <Text className="block mb-4">You need to be signed in as a restaurant owner to access the admin panel.</Text>
        </Card>
      </div>
    );
  }

  const userColumns = [
    {
      title: 'User',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <div className="flex items-center space-x-3">
          <Avatar icon={<UserOutlined />} />
          <span>{email}</span>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string) => (
        <Tag color={permissions === 'owner' ? 'gold' : 'blue'}>
          {permissions.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => message.info(`Viewing details for ${record.email}`)}
          >
            View Details
          </Button>
          <Button
            danger
            type="link"
            icon={<BlockOutlined />}
            onClick={() => handleBlockUser(record.id, record.email)}
          >
            Block
          </Button>
        </Space>
      ),
    },
  ];

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => `#${id.slice(-8)}`,
    },
    {
      title: 'Customer',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: string) => `User ${userId.slice(-8)}`,
    },
    {
      title: 'Items',
      dataIndex: 'orderitems',
      key: 'orderitems',
      render: (orderitems: Order['orderitems']) => `${orderitems.length} items`,
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Order['status']) => (
        <Tag color={getStatusColor(status)}>
          {status.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Order) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => message.info(`Viewing order #${record.id.slice(-8)}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Title level={2}>Admin Panel</Title>
          <Text className="text-gray-600">
            Manage users, orders, and blocked users for your restaurant
          </Text>
        </div>

        {/* Statistics Cards */}
        <Row gutter={16} className="mb-8">
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Users"
                value={users.length}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Orders"
                value={orders.length}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Blocked Users"
                value={blockedUsers.length}
                prefix={<BlockOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Card>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Users" key="users">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <Title level={4}>All Users</Title>
                  <Input
                    placeholder="Search users..."
                    prefix={<SearchOutlined />}
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    style={{ width: 250 }}
                  />
                </div>
              </div>

              <Table
                columns={userColumns}
                dataSource={filteredUsers}
                loading={usersLoading}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} users`,
                }}
              />
            </TabPane>

            <TabPane tab="Orders" key="orders">
              <div className="mb-4">
                <Title level={4}>All Orders</Title>
              </div>

              <Table
                columns={orderColumns}
                dataSource={orders}
                loading={ordersLoading}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} orders`,
                }}
              />
            </TabPane>

            <TabPane tab="Blocked Users" key="blocked">
              <div className="mb-4">
                <Title level={4}>Blocked Users</Title>
                <Text className="text-gray-600">
                  Users blocked from ordering at your restaurant
                </Text>
              </div>

              {blockedUsersLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : blockedUsers.length === 0 ? (
                <Empty
                  description="No blocked users"
                  image={<BlockOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />}
                />
              ) : (
                <List
                  dataSource={blockedUsers}
                  renderItem={(blockedUser) => (
                    <List.Item
                      actions={[
                        <Button
                          key="unblock"
                          type="primary"
                          onClick={() => handleUnblockUser(blockedUser.id, blockedUser.email || 'Unknown User')}
                        >
                          Unblock
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={blockedUser.email}
                        description={
                          <div>
                            <div>Blocked on: {blockedUser.blockedAt ? new Date(blockedUser.blockedAt).toLocaleDateString() : 'N/A'}</div>
                            <div>Role: <Tag color={blockedUser.permissions === 'owner' ? 'gold' : 'blue'}>{blockedUser.permissions}</Tag></div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
"use client";

import { Layout, Row, Col, Typography, Space } from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

export function Footer() {
  return (
    <AntFooter className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="text-white mb-4">
              FoodDelivery
            </Title>
            <Text className="text-gray-300 block mb-2">
              Delicious food delivered to your doorstep
            </Text>
            <Text className="text-gray-300">
              Order from your favorite restaurants with fast delivery
            </Text>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">
              Quick Links
            </Title>
            <Space orientation="vertical" className="text-gray-300">
              <Text className="text-gray-300 hover:text-white cursor-pointer">About Us</Text>
              <Text className="text-gray-300 hover:text-white cursor-pointer">Contact</Text>
              <Text className="text-gray-300 hover:text-white cursor-pointer">Privacy Policy</Text>
              <Text className="text-gray-300 hover:text-white cursor-pointer">Terms of Service</Text>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">
              Contact Info
            </Title>
            <Space orientation="vertical" className="text-gray-300">
              <div className="flex items-center">
                <PhoneOutlined className="mr-2" />
                <Text className="text-gray-300">+1 (555) 123-4567</Text>
              </div>
              <div className="flex items-center">
                <MailOutlined className="mr-2" />
                <Text className="text-gray-300">support@fooddelivery.com</Text>
              </div>
              <div className="flex items-center">
                <EnvironmentOutlined className="mr-2" />
                <Text className="text-gray-300">123 Food Street, City, State</Text>
              </div>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">
              Follow Us
            </Title>
            <Space className="text-gray-300">
              <Text className="text-gray-300 hover:text-white cursor-pointer">Facebook</Text>
              <Text className="text-gray-300 hover:text-white cursor-pointer">Twitter</Text>
              <Text className="text-gray-300 hover:text-white cursor-pointer">Instagram</Text>
            </Space>
          </Col>
        </Row>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <Text className="text-gray-400">
            © 2024 FoodDelivery. All rights reserved.
          </Text>
        </div>
      </div>
    </AntFooter>
  );
}
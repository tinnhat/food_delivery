'use client'

import { Layout, Button, Badge, Input } from 'antd'
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  SearchOutlined,
  HeartOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { useState } from 'react'

const { Header: AntHeader } = Layout
const { Search } = Input

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Modern Glassmorphism Header */}
      <AntHeader className='bg-white/90 backdrop-blur-xl border-b border-gray-200/50 px-4 md:px-6 sticky top-0 z-50 shadow-lg w-full h-20!'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-between h-20 min-h-[5rem]'>
            {/* Modern Logo & Brand */}
            <div className='flex items-center group flex-shrink-0'>
              <Link
                href='/'
                className='flex items-center space-x-3 transition-all duration-300 group-hover:scale-105'
              >
                {/* Sleek Logo Design */}
                <div className='relative'>
                  <div className='w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-500'>
                    <span className='text-xl'>🍽️</span>
                  </div>
                  {/* Subtle glow effect */}
                  <div className='absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md'></div>
                </div>

                {/* Clean Brand Typography */}
                <div className='hidden sm:block'>
                  <div className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent leading-tight'>
                    FoodFlow
                  </div>
                  <div className='text-xs text-emerald-600 font-semibold tracking-wide uppercase leading-tight'>
                    Smart • Fresh • Fast
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center space-x-8 flex-shrink-0'>
              {/* Clean Navigation Links */}
              <nav className='flex items-center space-x-6'>
                <Link
                  href='/'
                  className='relative text-white! hover:text-emerald-600 font-semibold transition-all duration-300 group py-2'
                >
                  Home
                  <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300'></span>
                </Link>

                <Link
                  href='/restaurants'
                  className='relative text-white! hover:text-emerald-600 font-semibold transition-all duration-300 group py-2'
                >
                  Restaurants
                  <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300'></span>
                </Link>

                <Link
                  href='/categories'
                  className='relative text-white! hover:text-emerald-600 font-semibold transition-all duration-300 group py-2'
                >
                  Categories
                  <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300'></span>
                </Link>
              </nav>

              {/* Modern Search Bar */}
              <div className='relative group flex-1 max-w-xs xl:max-w-sm'>
                <div className='rounded-2xl hover:border-emerald-300 transition-all duration-300 shadow-sm'>
                  <Search
                    placeholder='Search for food...'
                    size='large'
                    className='rounded-2xl border-none bg-transparent text-gray-700 placeholder-gray-400'
                    prefix={<SearchOutlined className='text-emerald-500' />}
                  />
                </div>
              </div>
            </div>

            {/* Desktop User Actions */}
            <div className='hidden lg:flex items-center space-x-4'>
              {/* Quick Actions */}
              <div className='flex items-center space-x-2'>
                <Button
                  type='text'
                  icon={<HeartOutlined className='text-lg' />}
                  size='large'
                  className='text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300'
                  title='Favorites'
                />

                <Button
                  type='text'
                  icon={<PhoneOutlined className='text-lg' />}
                  size='large'
                  className='text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-300'
                  title='Support'
                />
              </div>

              {/* User Account */}
              <Button
                type='text'
                icon={<UserOutlined className='text-lg' />}
                size='large'
                className='text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-emerald-300'
              >
                <span className='hidden xl:inline ml-2 font-medium'>Sign In</span>
              </Button>

              {/* Modern Cart Button */}
              <div className='relative group'>
                <Badge count={3} size='small' offset={[-2, 2]}>
                  <Button
                    type='primary'
                    icon={<ShoppingCartOutlined className='text-lg' />}
                    size='large'
                    className='bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-none rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105'
                  >
                    <span className='hidden xl:inline ml-2 font-bold'>$24.99</span>
                  </Button>
                </Badge>
                {/* Subtle pulse effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className='lg:hidden flex items-center space-x-2 flex-shrink-0'>
              {/* Mobile Search */}
              <Button
                type='text'
                icon={<SearchOutlined className='text-lg' />}
                size='large'
                className='text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300'
              />

              {/* Mobile Cart */}
              <div className='relative'>
                <Badge count={3} size='small'>
                  <Button
                    type='text'
                    icon={<ShoppingCartOutlined className='text-lg' />}
                    size='large'
                    className='text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300'
                  />
                </Badge>
              </div>

              {/* Mobile Menu */}
              <Button
                type='text'
                icon={<MenuOutlined className='text-lg' />}
                size='large'
                className='text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300'
                onClick={() => setMobileMenuOpen(true)}
              />
            </div>
          </div>
        </div>
      </AntHeader>

      {/* Modern Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        style={{ height: '100vh' }}
      >
        <div
          className='absolute inset-0 bg-black/20 backdrop-blur-sm'
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className='absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 overflow-hidden border-l border-gray-200'>
          <div className='p-6 h-full flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between mb-8 pb-4 border-b border-gray-100'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center'>
                  <span className='text-lg'>🍽️</span>
                </div>
                <div>
                  <div className='font-bold text-gray-900'>FoodFlow</div>
                  <div className='text-xs text-gray-500'>Smart Delivery</div>
                </div>
              </div>
              <Button
                type='text'
                icon={<span className='text-xl'>✕</span>}
                className='text-gray-400 hover:text-gray-600'
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>

            {/* Navigation Menu */}
            <div className='flex-1 space-y-2'>
              <div className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4'>
                Navigation
              </div>

              <Link
                href='/'
                className='flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300'
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
                  🏠
                </div>
                <span>Home</span>
              </Link>

              <Link
                href='/restaurants'
                className='flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300'
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
                  🍽️
                </div>
                <span>Restaurants</span>
              </Link>

              <Link
                href='/categories'
                className='flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300'
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
                  📂
                </div>
                <span>Categories</span>
              </Link>

              <Link
                href='/orders'
                className='flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300'
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
                  📦
                </div>
                <span>My Orders</span>
              </Link>
            </div>

            {/* Footer Actions */}
            <div className='space-y-3 pt-6 border-t border-gray-100'>
              <Button
                type='primary'
                block
                size='large'
                className='bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-none rounded-xl font-semibold shadow-lg'
              >
                Sign In / Sign Up
              </Button>

              <Button
                block
                size='large'
                className='bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 rounded-xl font-medium'
              >
                📞 Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

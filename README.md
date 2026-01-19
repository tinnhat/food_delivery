# FoodDelivery - Modern Food Ordering Platform

A modern, responsive food delivery web application built with Next.js, TanStack Query, Tailwind CSS, and Ant Design.

## 🚀 Features

- **Modern UI/UX**: Clean and intuitive interface with responsive design
- **Restaurant Discovery**: Browse restaurants by category and location
- **Food Ordering**: Add items to cart and place orders seamlessly
- **Real-time Updates**: Live order tracking and status updates
- **Mobile Optimized**: Fully responsive design for all devices
- **Fast Performance**: Optimized with Next.js and TanStack Query

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS + Ant Design
- **State Management**: TanStack Query (React Query)
- **Language**: TypeScript
- **Icons**: Ant Design Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd food_delivery
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── layout/           # Layout components (Header, Footer, Layout)
│   ├── home/             # Home page components
│   └── ui/               # UI components
├── data/                 # Mock data and constants
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## 🎨 Components

### Layout Components
- **Header**: Navigation bar with search, user menu, and cart
- **Footer**: Contact information and links
- **AppLayout**: Main application wrapper

### Home Page Components
- **HeroSection**: Hero banner with search functionality
- **CategoriesSection**: Food categories grid
- **FeaturedRestaurants**: Popular restaurants showcase
- **PopularDishes**: Trending food items

## 📊 Data Structure

### Restaurant
```typescript
interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string[];
  isOpen: boolean;
  address: string;
  phone: string;
}
```

### Food Item
```typescript
interface FoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  restaurantId: string;
  rating?: number;
  preparationTime?: string;
}
```

## 🔧 Configuration

### TanStack Query Setup
- Configured with optimized defaults
- 1-minute stale time for queries
- 10-minute garbage collection time

### Ant Design Theme
- Orange primary color (#f97316)
- Custom font family integration
- Responsive breakpoints

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file for environment variables:
```env
NEXT_PUBLIC_API_URL=https://api.fooddelivery.com
```

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first approach.

## 🎯 Performance Optimizations

- **Next.js Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **TanStack Query**: Intelligent caching and background updates
- **Tailwind CSS**: Purge unused styles in production

## 🔒 Security

- TypeScript for type safety
- ESLint for code quality
- Content Security Policy headers
- Input validation and sanitization

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact:
- Email: support@fooddelivery.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ using Next.js, TanStack Query, Tailwind CSS, and Ant Design.

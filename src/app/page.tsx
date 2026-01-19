import { AppLayout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedRestaurants } from "@/components/home/FeaturedRestaurants";
import { PopularDishes } from "@/components/home/PopularDishes";
import { CategoriesSection } from "@/components/home/CategoriesSection";

export default function Home() {
  return (
    <AppLayout>
      <main className="min-h-screen">
        {/* Hero Section - Full width for maximum impact */}
        <HeroSection />

        {/* Categories Section with gradient background */}
        <CategoriesSection />

        {/* Featured Restaurants Section */}
        <FeaturedRestaurants />

        {/* Popular Dishes Section */}
        <PopularDishes />
      </main>
    </AppLayout>
  );
}

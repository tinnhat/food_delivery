import { AppLayout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedRestaurants } from "@/components/home/FeaturedRestaurants";
import { PopularDishes } from "@/components/home/PopularDishes";
import { CategoriesSection } from "@/components/home/CategoriesSection";

export default function Home() {
  return (
    <AppLayout>
      <main className="min-h-screen">
        {/* Hero Section - Full width */}
        <section className="mb-16">
          <HeroSection />
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <CategoriesSection />
        </section>

        {/* Featured Restaurants Section */}
        <section className="mb-16">
          <FeaturedRestaurants />
        </section>

        {/* Popular Dishes Section */}
        <section className="mb-16">
          <PopularDishes />
        </section>
      </main>
    </AppLayout>
  );
}

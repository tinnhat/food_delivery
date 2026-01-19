import { FoodItem } from "@/types";

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  fit?: 'crop' | 'scale' | 'fill';
}

/**
 * Generate optimized image URL with parameters
 */
export function getOptimizedImageUrl(
  baseUrl: string,
  options: ImageOptimizationOptions = {}
): string {
  const {
    width = 400,
    height = 300,
    quality = 80,
    format = 'webp',
    fit = 'crop'
  } = options;

  // If it's an Unsplash URL, add optimization parameters
  if (baseUrl.includes('unsplash.com')) {
    const url = new URL(baseUrl);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('h', height.toString());
    url.searchParams.set('fit', fit);
    url.searchParams.set('crop', 'center');
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fm', format);
    return url.toString();
  }

  return baseUrl;
}

/**
 * Get responsive image sources for different screen sizes
 */
export function getResponsiveImageSources(imageUrl: string) {
  return {
    thumbnail: getOptimizedImageUrl(imageUrl, { width: 150, height: 150 }),
    small: getOptimizedImageUrl(imageUrl, { width: 300, height: 200 }),
    medium: getOptimizedImageUrl(imageUrl, { width: 400, height: 300 }),
    large: getOptimizedImageUrl(imageUrl, { width: 800, height: 600 }),
  };
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(imageUrl: string): string {
  const sources = getResponsiveImageSources(imageUrl);
  return `${sources.small} 300w, ${sources.medium} 400w, ${sources.large} 800w`;
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizesAttribute(): string {
  return "(max-width: 480px) 300px, (max-width: 768px) 400px, 800px";
}

/**
 * Get fallback image URL for error handling
 */
export function getFallbackImageUrl(category: string): string {
  const fallbackImages = {
    Pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    Pasta: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    "Sushi Rolls": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    Curry: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    Burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    Bowls: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    default: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
  };

  return fallbackImages[category as keyof typeof fallbackImages] || fallbackImages.default;
}

/**
 * Enhance food item with optimized image properties
 */
export function enhanceFoodItemWithImages(foodItem: FoodItem): FoodItem {
  const sources = getResponsiveImageSources(foodItem.image);

  return {
    ...foodItem,
    image: sources.medium,
    imageThumbnail: sources.thumbnail,
    imageLarge: sources.large,
    imageAlt: foodItem.imageAlt || `${foodItem.name} - ${foodItem.description}`,
    imageMetadata: foodItem.imageMetadata || {
      width: 400,
      height: 300,
      format: "jpg",
      size: 85000
    }
  };
}

/**
 * Preload critical images for better performance
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Check if image URL is valid and accessible
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
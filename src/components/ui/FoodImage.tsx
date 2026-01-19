"use client";

import Image from "next/image";
import { useState } from "react";
import { FoodItem } from "@/types";
import {
  getOptimizedImageUrl,
  generateSrcSet,
  generateSizesAttribute,
  getFallbackImageUrl
} from "@/utils/imageUtils";

interface FoodImageProps {
  foodItem: FoodItem;
  className?: string;
  priority?: boolean;
  quality?: number;
  size?: 'thumbnail' | 'small' | 'medium' | 'large';
}

/**
 * Enhanced Food Image Component with optimization, lazy loading, and fallbacks
 */
export function FoodImage({
  foodItem,
  className = "",
  priority = false,
  quality = 80,
  size = 'medium'
}: FoodImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get the appropriate image URL based on size
  const getImageUrl = () => {
    if (imageError) {
      return getFallbackImageUrl(foodItem.category);
    }

    switch (size) {
      case 'thumbnail':
        return foodItem.imageThumbnail || getOptimizedImageUrl(foodItem.image, { width: 150, height: 150 });
      case 'small':
        return getOptimizedImageUrl(foodItem.image, { width: 300, height: 200 });
      case 'large':
        return foodItem.imageLarge || getOptimizedImageUrl(foodItem.image, { width: 800, height: 600 });
      default:
        return foodItem.image;
    }
  };

  const imageUrl = getImageUrl();
  const altText = foodItem.imageAlt || `${foodItem.name} - ${foodItem.description}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg">
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <Image
        src={imageUrl}
        alt={altText}
        fill
        priority={priority}
        quality={quality}
        sizes={generateSizesAttribute()}
        className={`object-cover transition-all duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
      />

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🍽️</div>
            <div className="text-sm font-medium">{foodItem.name}</div>
            <div className="text-xs">Image unavailable</div>
          </div>
        </div>
      )}

      {/* Image overlay for effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

/**
 * Food Image Gallery Component for multiple images
 */
interface FoodImageGalleryProps {
  foodItem: FoodItem;
  images?: string[];
  className?: string;
}

export function FoodImageGallery({
  foodItem,
  images = [],
  className = ""
}: FoodImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const allImages = [foodItem.image, ...images];

  return (
    <div className={`relative ${className}`}>
      {/* Main image */}
      <FoodImage
        foodItem={{ ...foodItem, image: allImages[selectedImageIndex] }}
        className="w-full h-64 rounded-lg"
        size="large"
      />

      {/* Thumbnail gallery */}
      {allImages.length > 1 && (
        <div className="flex space-x-2 mt-3 overflow-x-auto">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FoodImage
                foodItem={{ ...foodItem, image }}
                size="thumbnail"
                className="w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
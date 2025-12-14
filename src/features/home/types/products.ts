// src/features/home/types/product.ts
export type ProductImage = {
  productImageId: string;
  location: string;
  isPrimary: boolean;
};

// This maps directly to the API response format
export type ApiProduct = {
  productId: string; // The GUID from the API
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  addedDate: string;
  lastModified: string;
  images: ProductImage[];
};

// We can define a simplified type for displaying products on the card,
// mapping the API format to your existing card needs.
export type DisplayProduct = {
  id: string; // Use productId as the ID
  name: string;
  price: number;
  image: string; // Primary image URL
  description: string; // Description for the detail page
};
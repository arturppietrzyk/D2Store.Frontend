import type { Category } from './categories';

export type ProductImage = {
  productImageId: string;
  location: string;
  isPrimary: boolean;
};

export type Product = {
  productId: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  addedDate: string;
  lastModified: string;
  images: ProductImage[];
  categories?: Category[]; 
};

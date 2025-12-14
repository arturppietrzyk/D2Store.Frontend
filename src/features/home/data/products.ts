// src/shared/data/products.ts
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

export const mockProducts: Product[] = [
  { id: 1, name: "Asus ProArt GeForce RTX 4070 SUPER", category: "Graphic Cards", price: 999.99, image: "/GPU.png" },
  { id: 2, name: "MSI GeForce RTX 4060 TI VENTUS 2X", category: "Graphic Cards", price: 2399.99, image: "/GPU2.png" },
  { id: 3, name: "MSI GeForce RTX 4070 SUPER VENTUS 3X", category: "Graphic Cards", price: 1999.99, image: "/GPU3.png" },
  { id: 4, name: "ZOTAC GAMING GeForce RTX 4080", category: "Graphic Cards", price: 899.99, image: "/GPU4.png" },
  { id: 5, name: "MSI GeForce RTX 5060 TI VENTUS 2X", category: "Graphic Cards", price: 1999.99, image: "/GPU5.png" },
  { id: 6, name: "MSI GeForce RTX 5070 TI VENTUS 2X", category: "Graphic Cards", price: 2299.99, image: "/GPU6.png" },
  { id: 7, name: "MSI GeForce RTX 5060 TI VENTUS 2X", category: "Graphic Cards", price: 1999.99, image: "/GPU5.png" },
  { id: 8, name: "MSI GeForce RTX 5060 TI VENTUS 2X", category: "Graphic Cards", price: 1999.99, image: "/GPU5.png" },
];
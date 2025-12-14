import apiClient from "../../../infrastructure/apiClient";
import type { Product } from "../types/products";

export async function getProducts(
  pageNumber: number = 1,
  pageSize: number = 100
): Promise<Product[]> {
  const response = await apiClient.get<Product[]>("/products", {
    params: { pageNumber, pageSize }
  });
  return response.data;
}

export async function getProductById(productId: string): Promise<Product> {
  const response = await apiClient.get<Product>(`/product/${productId}`);
  return response.data;
}

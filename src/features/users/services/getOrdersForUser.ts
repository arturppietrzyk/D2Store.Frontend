import apiClient from "../../../infrastructure/apiClient";
import type { Order } from "../types/order";

export async function GetOrdersForUser(userId: string, pageNumber: number = 1,
  pageSize: number = 100): Promise<Order[]> {
  const response = await apiClient.get<Order[]>(`/users/${userId}/orders`, {
    params: { 
      pageNumber, 
      pageSize 
    }
  });
  
  return response.data;
}
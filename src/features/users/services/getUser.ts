import apiClient from "../../../infrastructure/apiClient";
import type { User } from "../types/user";

export async function getUserById(userId: string): Promise<User> {
  const response = await apiClient.get<User>(`/users/${userId}`);
  return response.data;
}
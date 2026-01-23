import apiClient from "../../../infrastructure/apiClient";
import type { UpdateRequest } from "../types/updateRequest";

export async function updateUser(userId: string, data: UpdateRequest): Promise<void> {
  await apiClient.patch(`/users/${userId}`, data);
}
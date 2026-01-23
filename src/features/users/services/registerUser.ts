import apiClient from "../../../infrastructure/apiClient";
import type { User } from "../types/user";
import type { RegisterRequest } from "../types/registerRequest"

export async function registerUser(registerRequest: RegisterRequest): Promise<User> {
  const response = await apiClient.post<User>("/users", registerRequest, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data; 
}
import apiClient from "../../../infrastructure/apiClient";
import type { LoginResponse } from "../types/loginResponse";
import type { LoginRequest } from "../types/loginRequest";

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/users/login", credentials, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
}

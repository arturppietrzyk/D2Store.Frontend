import apiClient from "../../../infrastructure/apiClient";
import type { AuthResponse } from "../types/authResponse";

interface LoginRequest {
  email: string;
  password: string;
}

export async function loginUser(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/login-user", credentials, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
}

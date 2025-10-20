import apiClient from "../../../infrastructure/apiClient";
import type { RegisterUserResponse } from "../types/registerUserResponse";

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export async function registerUser(registerRequest: RegisterRequest): Promise<RegisterUserResponse> {
  const response = await apiClient.post<RegisterUserResponse>("/register-user", registerRequest, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data; 
}
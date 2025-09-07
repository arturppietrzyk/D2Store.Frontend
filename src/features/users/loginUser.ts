import apiClient from "../../infrastructure/apiClient";

interface LoginRequest {
  email: string;
  password: string;
}


export async function loginUser(credentials: LoginRequest): Promise<string> {
  const response = await apiClient.post<string>("/login-user", credentials, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data; // response.data IS the token string
}

import apiClient from "../../../infrastructure/apiClient";

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}


export async function registerUser(registerRequest: RegisterRequest): Promise<string> {
  const response = await apiClient.post<string>("/register-user", registerRequest, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data; 
}

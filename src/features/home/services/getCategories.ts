import apiClient from "../../../infrastructure/apiClient";
import type { Category } from "../types/categories"

export async function getCategories(

): Promise<Category[]> {
    const response = await apiClient.get<Category[]>("/categories");
    return response.data.sort((a, b) => a.name.localeCompare(b.name));
}
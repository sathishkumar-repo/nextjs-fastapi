import { apiClient } from "@/lib/apiClient"
import { User } from "../types/users"

export async function getUsers(): Promise<User[]> {
  return apiClient("/users")
}

export async function createUser(name: string): Promise<User> {
  return apiClient("/users", {
    method: "POST",
    body: JSON.stringify({ name })
  })
}

export async function updateUser(id: number, name: string): Promise<User> {
  return apiClient(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name })
  })
}

export async function deleteUser(id: number): Promise<void> {
  await apiClient(`/users/${id}`, {
    method: "DELETE"
  })
}

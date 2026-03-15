import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../services/userApi"

export function useUsers() {

  const query = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  })

  return {
    users: query.data || [],
    loading: query.isLoading,
    error: query.error,
    reload: query.refetch
  }
}
import { useEffect, useState } from "react"
import { getUsers } from "../services/userApi"
import { User } from "../types/user"

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  async function loadUsers() {
    setLoading(true)

    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return {
    users,
    loading,
    reload: loadUsers
  }
}
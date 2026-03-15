"use client"

import UserList from "@/features/users/components/UserList"
import UserForm from "@/features/users/components/UserForm"
import { useUsers } from "@/features/users/hooks/useUsers"

export default function HomePage() {

  const { users, loading, reload } = useUsers()

  return (
    <div style={{ padding: "20px" }}>

      <h1>User Management</h1>

      <UserForm onUserCreated={reload} />

      <hr />

      <UserList users={users} loading={loading} />

    </div>
  )
}
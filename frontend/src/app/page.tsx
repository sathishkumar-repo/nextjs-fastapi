"use client"

import UserList from "@/features/users/components/UserList"
import UserForm from "@/features/users/components/UserForm"
import { useUsers } from "@/features/users/hooks/useUsers"

export default function HomePage() {

  const { users, loading, reload } = useUsers()

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your users efficiently</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Add New User</h2>
            <UserForm onUserCreated={reload} />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Users List</h2>
            <UserList users={users} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}
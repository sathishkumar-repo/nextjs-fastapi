"use client"

import { User } from "../types/user"

interface Props {
  users: User[]
  loading: boolean
}

export default function UserList({ users, loading }: Props) {

  if (loading) {
    return <p>Loading users...</p>
  }

  if (users.length === 0) {
    return <p>No users found</p>
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  )
}
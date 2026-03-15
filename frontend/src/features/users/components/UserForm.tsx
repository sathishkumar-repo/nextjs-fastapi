"use client"

import { useState } from "react"
import { createUser } from "../services/userApi"

interface Props {
  onUserCreated: () => void
}

export default function UserForm({ onUserCreated }: Props) {

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name) return

    setLoading(true)

    try {
      await createUser(name)
      setName("")
      onUserCreated()
    } catch (error) {
      console.error("Failed to create user", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  )
}
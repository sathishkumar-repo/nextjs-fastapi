"use client"

import { useState } from "react"
import { updateUser, deleteUser } from "../services/userApi"
import { User } from "../types/users"

interface Props {
  users: User[]
  loading: boolean
  onUserChanged: () => void
}

export default function UserList({ users, loading, onUserChanged }: Props) {
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const startEditing = (user: User) => {
    setEditingUserId(user.id)
    setEditingName(user.name)
    setError("")
  }

  const cancelEditing = () => {
    setEditingUserId(null)
    setEditingName("")
    setError("")
  }

  const handleSave = async (userId: number) => {
    if (!editingName.trim()) {
      setError("Name is required")
      return
    }

    setSaving(true)
    setError("")

    try {
      await updateUser(userId, editingName.trim())
      onUserChanged()
      cancelEditing()
    } catch (err) {
      console.error(err)
      setError("Failed to update user. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (userId: number) => {
    const confirmed = window.confirm("Delete this user? This action cannot be undone.")
    if (!confirmed) return

    setSaving(true)
    setError("")

    try {
      await deleteUser(userId)
      onUserChanged()
    } catch (err) {
      console.error(err)
      setError("Failed to delete user. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-16 rounded-md"></div>
        ))}
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No users found. Create your first user!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {users.map((user) => {
        const isEditing = editingUserId === user.id

        return (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                      disabled={saving}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">ID: {user.id}</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">ID: {user.id}</p>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSave(user.id)}
                      disabled={saving}
                      className="inline-flex items-center justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      disabled={saving}
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => startEditing(user)}
                      className="inline-flex items-center justify-center rounded-md border border-blue-500 bg-white px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:bg-gray-900 dark:text-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="inline-flex items-center justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
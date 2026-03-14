"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser } from "@/services/userService";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  async function handleSubmit() {
    await createUser(name);
    setName("");
    loadUsers();
  }

  return (
    <div>
      <h1>User List</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      <button onClick={handleSubmit}>
        Add User
      </button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
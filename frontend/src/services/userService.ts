const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
    console.log("API URL:", API_URL); // Debugging line to check the API URL
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function createUser(name: string) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });

  return res.json();
}
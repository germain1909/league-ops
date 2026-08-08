const API_URL = "http://localhost:3001";

export async function getHealth() {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Failed to fetch health status");
  }

  return response.json();
}
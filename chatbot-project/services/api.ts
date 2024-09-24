
export interface User {
  id: string;
  name: string;
}

const API_BASE_URL = 'http://localhost:4000/api/v1';

export async function createNewUser(name: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { name } }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.join(', ') || 'Failed to create user');
  }

  return response.json();
}

export async function getUserInfo(userId: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users?id=${userId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to get user info');
  }

  return response.json();
}
// Centralized API helper for the QuickShow backend

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

let getAuthToken = null;

// Register a function that returns the current Clerk session JWT
export function setAuthTokenProvider(fn) {
  getAuthToken = fn;
}

export async function api(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth && getAuthToken) {
    try {
      const token = await getAuthToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      // token unavailable; proceed without it
    }
  }

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    throw new Error('Network error - backend unreachable');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    const err = new Error(data.message || 'Request failed');
    err.status = response.status;
    throw err;
  }

  return data;
}
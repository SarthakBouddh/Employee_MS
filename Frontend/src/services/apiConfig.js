// Get the backend URL from environment variable or use a fallback
export const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Log the base URL in development to help with debugging
if (import.meta.env.DEV) {
  console.log('Backend URL:', BASE_URL);
}
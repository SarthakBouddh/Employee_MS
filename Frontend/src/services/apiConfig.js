// Get the backend URL from environment variable or use appropriate fallback
const getBackendUrl = () => {
  // Check if we're in production (Vercel)
  if (window.location.hostname !== 'localhost') {
    // Production: Use environment variable or default Render URL
    return import.meta.env.VITE_BACKEND_URL || 'https://employee-ms-9rwp.onrender.com';
  } else {
    // Development: Use localhost
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  }
};

export const BASE_URL = getBackendUrl();

// Add API version prefix
export const API_BASE_URL = `${BASE_URL}/api/v1`;

// Log the base URL in development to help with debugging
if (import.meta.env.DEV) {
  console.log('Backend URL:', BASE_URL);
  console.log('API Base URL:', API_BASE_URL);
}
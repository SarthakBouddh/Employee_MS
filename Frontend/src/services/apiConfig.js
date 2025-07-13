const isBrowser = typeof window !== "undefined";

const getBackendUrl = () => {
  const fallbackURL = 'https://employee-ms-9rwp.onrender.com';
  const localURL = 'http://localhost:5000';

  if (isBrowser && window.location.hostname !== 'localhost') {
    return import.meta.env.VITE_BACKEND_URL || fallbackURL;
  } else {
    return import.meta.env.VITE_BACKEND_URL || localURL;
  }
};

const normalizeUrl = (url) => url.replace(/\/+$/, "");

export const BASE_URL = normalizeUrl(getBackendUrl());
export const API_BASE_URL = `${BASE_URL}/api/v1`;

if (import.meta.env.DEV) {
  console.log('Backend URL:', BASE_URL);
  console.log('API Base URL:', API_BASE_URL);
}

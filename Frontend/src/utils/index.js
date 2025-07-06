import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

// Optional: Global error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized");
      // redirect to login if needed
    }
    return Promise.reject(error);
  }
);

export const login = (data) => api.post("/api/user/login", data); 


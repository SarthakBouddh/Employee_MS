import { apiConnector } from "../apiConnector";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../apiConfig";

// CREATE TASK (Admin only)
// CREATE TASK (Admin only)
export const createTask = async (token, taskData) => {
  try {
    const response = await apiConnector(
      "POST",
      `${API_BASE_URL}/task/create`,
      taskData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    toast.success("Task created successfully");
    return response.data;
  } catch (error) {
    const message = error?.response?.message || error.message || "Failed to create task";
    toast.error(message);
    throw new Error(message); // Optional: re-throw for upstream handling
  }
};

// GET ALL EMPLOYEES (Admin only)
export const getAllEmployees = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${API_BASE_URL}/employee/employees`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return response.data;
  } catch (error) {
    const message = error?.response?.message || error.message || "Failed to fetch employees";
    toast.error(message);
    throw new Error(message);
  }
};

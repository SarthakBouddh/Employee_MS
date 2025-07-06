import { apiConnector } from "../apiConnector";
import { toast } from "react-toastify";
import { BASE_URL } from "../apiConfig";

// CREATE TASK (Admin only)
export const createTask = async (token, taskData) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/task/create`,
      taskData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    toast.success("Task created successfully");
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to create task";
    toast.error(message);
  }
};

// GET ALL EMPLOYEES (Admin only)
export const getAllEmployees = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/employee/employees`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return response.data;
  } catch (error) {}
};

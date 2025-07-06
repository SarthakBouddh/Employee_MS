import { apiConnector } from "../apiConnector";
const BASE_URL = "http://localhost:5000/api/v1";
import { toast } from "react-toastify";

export const getTasksByStatus = async (token, status) => {
  const url = `${BASE_URL}/task/get-tasks?status=${status}`;
  try {
    const response = await apiConnector("GET", url, null, {
      Authorization: `Bearer ${token}`,
    });
    return response;
  } catch {}
};

export const updateTaskStatus = async (token, taskId, status) => {
  try {
    const url = `${BASE_URL}/employee/update-task-status/${taskId}`;
    const response = await apiConnector(
      "PATCH",
      url,
      { status: status },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success(response.message || "Task status updated successfully");
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to update task status";
    toast.error(message);
    return null;
  }
};

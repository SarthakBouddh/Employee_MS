import { apiConnector } from "../apiConnector";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../apiConfig";

export const login = async (credentials, setUser, navigate) => {
  try {
    const response = await apiConnector(
      "POST",
      `${API_BASE_URL}/auth/login`,
      credentials
    );

    const { token, user } = response.data;

    const userData = {
      _id: user._id,
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    setUser(userData);

    toast.success(response.message || "Login successful");

    // Navigate based on role
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "employee") {
      navigate("/employee");
    } else {
      navigate("/login");
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || "Login failed. Please try again.";
    toast.error(message);
  }
};

export const logout = async (req , res , next) =>{
   
}

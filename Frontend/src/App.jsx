import { Routes, Route, Navigate, useNavigate } from "react-router";
import Login from "./component/Auth/Login";
import EmployeeDashboard from "./component/Dashboard/EmployeeDashboard";
import AdminDashboard from "./component/Dashboard/AdminDashboard";
import "./App.css";
import { useUser } from "./context/UserContext";
import { toast } from "react-toastify";

function App() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to={`/${user?.role}`} replace /> : <Login />}
      />

      <Route
        path="/admin"
        element={
          user?.role === "admin" ? (
            <AdminDashboard changeUser={handleLogout} data={user}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/employee"
        element={
          user?.role === "employee" ? (
            <EmployeeDashboard changeUser={handleLogout} data={user}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;

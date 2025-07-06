import React, { useState } from "react";
import "../../App.css";
import { login } from "../../services/operations/authApi";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await login({ email, password }, setUser, navigate);
  };

  return (
    <div
      id="login"
      className="flex h-screen items-center justify-center overflow-hidden"
    >
      <div className="border-2 rounded-xl border-emerald-600 p-10 sm:p-20">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center w-72 sm:w-96 gap-4"
        >
          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              required
              className="w-full text-white outline-none bg-transparent border-2 border-emerald-600 text-lg py-3 px-4 rounded-full placeholder:text-gray-300"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              required
              className="w-full text-white outline-none bg-transparent border-2 border-emerald-600 text-lg py-3 px-4 rounded-full placeholder:text-gray-300"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-3 w-full text-white bg-emerald-600 text-lg py-3 px-6 rounded-full border-none hover:bg-emerald-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

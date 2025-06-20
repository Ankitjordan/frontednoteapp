import React, { useState } from "react";
import axios from "axios";

const Login = ({ setDisplay, setActiveComponent, setIdentity }) => {
  const [showError, setShowError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      setShowError("Please enter both username and password");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://backendnote-app.vercel.app/login",
        {
          username,
          password,
        }
      );
      setIdentity(response.data.username);
      console.log(response.data);
      setShowError("");
      setTimeout(() => {
        setIsLoading(false);
        if (setDisplay) setDisplay("main");
      }, 3000);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setShowError("Invalid Username or Password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 relative">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg sd:h-[60vh] flex flex-col justify-around sd:p-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 sd:mb-1 max-sm:text-lg">
          Login to Your Account
        </h2>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none text-black"
              placeholder="Enter your username"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none text-black"
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 sd:mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          )}
          {showError && (
            <p className="text-sm text-red-600 text-center mt-2">{showError}</p>
          )}
          <p className="text-sm text-gray-600 text-center mt-4">
            Not registered yet?{" "}
            <span
              onClick={() => {
                if (setActiveComponent) setActiveComponent("register");
              }}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

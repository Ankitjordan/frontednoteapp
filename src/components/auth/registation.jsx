/* eslint-disable no-empty */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Registration = ({ setDisplay, setActiveComponent }) => {
  const [after, setAfter] = useState("");
  const formRef = useRef();

  useEffect(() => {
    if (setActiveComponent) {
      setActiveComponent("register");
    }
  }, [setActiveComponent]);

  const collection = {
    success: (
      <p className="text-lg text-green-600 font-semibold mt-4">
        ✅ Registration successful! You can now log in and manage your notes.
      </p>
    ),
    err: <p className="text-lg text-red-500">Username Already taken</p>,
    mismatch: <p className="text-lg text-red-500">Passwords do not match</p>,
    short: (
      <p className="text-lg text-red-500">
        Password should be at least 8 characters
      </p>
    ),
    server: (
      <p className="text-lg text-red-500">
        Something went wrong. Try again later.
      </p>
    ),
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    const username = form.username.value.trim();
    const password = form.password.value;
    const rePassword = form.reenterPassword.value;

    if (password.length < 8) {
      setAfter(collection.short);
      return;
    }

    if (password !== rePassword) {
      setAfter(collection.mismatch);
      return;
    }

    try {
      await axios.post("http://localhost:700/signup", {
        username,
        password,
      });
      setAfter(collection.success);
      setTimeout(() => {
        if (setActiveComponent) setActiveComponent("login");
      }, 3000);
      form.reset();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAfter(collection.err);
      } else {
        console.error(error);
        setAfter(collection.server);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-100 px-4 relative">
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-800">
          Create Your Account
        </h2>
        <form
          ref={formRef}
          className="space-y-5 sd:space-y-8"
          onSubmit={handleFormSubmit}
        >
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
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-violet-500"
              placeholder="Choose a cool username"
              autoComplete="off"
              required
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
              minLength={8}
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-violet-500"
              placeholder="Create a strong password (min 8 chars)"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label
              htmlFor="reenterPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter Password
            </label>
            <input
              type="text"
              id="reenterPassword"
              name="reenterPassword"
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-violet-500"
              placeholder="Re-enter your password"
              autoComplete="off"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl transition duration-300"
          >
            Register
          </button>
          {after}
        </form>
      </div>
    </div>
  );
};

export default Registration;

import type { NextPage } from "next";
import React from "react";

const Login: NextPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = document.querySelector("#email") as HTMLInputElement;
    const password = document.querySelector("#password") as HTMLInputElement;
    const remember = document.querySelector("#remember") as HTMLInputElement;

    console.log("Data: ", email.value, password.value, remember.checked);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-start bg-white gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p>Welcome back. Please enter your details</p>
        </div>
        <form
          onSubmit={handleSubmit}
          action="/"
          method="post"
          className="flex flex-col w-full gap-6"
        >
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="email" className="w-full text-left font-medium">
              Email
            </label>
            <input
              className="w-full border-2 p-2 rounded"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="password" className="w-full text-left font-medium">
              Password
            </label>
            <input
              className="w-full border-2 p-2 rounded"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between group">
            <label htmlFor="remember" className="checkbox-container">
              <input type="checkbox" name="remember" id="remember" />
              <div className="checkmark" />
              <div className="text" data-text="Remember me" />
            </label>
            <a href="#" className="font-semibold">
              Forgot password
            </a>
          </div>
          <button
            className="w-full h-10 bg-coffee-dark rounded-md font-medium text-coffee-cream-light text-xl"
            type="submit"
          >
            Sign in
          </button>
          <div className="text-center">
            Don't have an account?
            <a href="/" className="font-semibold">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

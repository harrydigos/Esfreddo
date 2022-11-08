import type { NextPage } from "next";
import React from "react";
import { ErrorForm } from "../components/errorForm";
import EyeIcon from "../components/icons/EyeIcon";
import EyeSlashIcon from "../components/icons/EyeSlashIcon";
import WarningIcon from "../components/icons/WarningIcon";
import { LoginForm } from "./api/loginForm";

const Login: NextPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState("false");
  // const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: LoginForm = {
      email,
      password,
      rememberMe,
    };

    const response = await fetch("/api/loginForm", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
      return;
      // return <ErrorForm error={data.error} />;
    }

    console.log(data);
  };
  const togglePassword = () => {
    // const passwordInput = document.querySelector("#password") as HTMLInputElement;

    if (password === "") {
      return <></>;
    }

    return (
      <button className="absolute top-1/2 -translate-y-1/2 right-3">
        <EyeIcon className="stroke-coffee-dark" />
      </button>
    );

    // if (passwordInput.type === "password") {
    //   return <EyeIcon className="stroke-coffee-dark" />;
    // } else {
    //   passwordInput.type = "text";
    //   return <EyeSlashIcon className="stroke-coffee-dark" />;
    // }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-[22rem] flex flex-col items-start bg-white gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">Login</h1>
          <p className="text-lg">Welcome back. Please enter your details</p>
        </div>
        <form className="flex flex-col w-full gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="email" className="w-full text-base font-semibold">
              Email
            </label>
            <input
              className="input-field"
              id="email"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target?.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="password"
              className="w-full text-base font-semibold"
            >
              Password
            </label>
            <div className="w-full relative flex justify-between items-center gap-3">
              <input
                className="input-field error"
                id="password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target?.value)}
                placeholder="Enter your password"
              />
              {togglePassword()}
            </div>

            <div className="flex gap-2 font-medium text-[#FF3333]">
              <WarningIcon className="fill-[#FF3333]" />
              Your password is incorrect
            </div>
          </div>
          <div className="flex justify-between group">
            <label htmlFor="rememberMe" className="checkbox-container">
              <input
                type="checkbox"
                id="rememberMe"
                defaultValue={rememberMe}
                onChange={({ target }) =>
                  setRememberMe(target?.value === "true" ? "false" : "true")
                }
              />
              <div className="checkmark" />
              <div className="text" data-text="Remember me" />
            </label>
            <a href="#" className="font-semibold">
              Forgot password
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-coffee-dark rounded-md font-medium text-coffee-cream-light text-2xl"
          >
            Sign in
          </button>
          <div className="text-center">
            Don't have an account?
            <a href="/" className="font-semibold p-1">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

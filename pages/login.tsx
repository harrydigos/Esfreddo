import type { NextPage } from "next";
import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import ErrorForm from "@components/ErrorForm";
import Link from "next/link";
import ToggleEyeIcon from "@components/ToggleEyeIcon";
import { usePageAuthGuard } from "utils/pageGuard";
import Image from "next/image";
import coffeeMachineImg from "@public/coffeeMachine.jpg";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  usePageAuthGuard();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isPasswordHidden, setPasswordHidden] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const supabase = useSupabaseClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  // const onSubmitTest: SubmitHandler<FormInputs> = (data) => {
  //   console.log(data);
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("email", email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="container-2xl h-screen flex justify-between">
        <div className="flex w-full justify-center items-center">
          <div className="w-[22rem] flex flex-col items-start bg-white gap-6 text-dark">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-bold">Login</h1>
              <p className="text-lg">Welcome back. Please enter your details</p>
            </div>
            <form
              className="flex flex-col w-full gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-start gap-2">
                <label
                  htmlFor="email"
                  className="w-full text-base font-semibold"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  className={`input-field ${error ? "-error" : ""}`}
                  id="email"
                  type={"email"}
                  value={email}
                  onChange={({ target }) => setEmail(target?.value)}
                  placeholder="Enter your email"
                />
                {errors.email && "First name is required"}
                {/* <ErrorForm error={error} errorMsg={errorMessage} /> */}
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
                    {...register("password", { required: true })}
                    className={`input-field ${error ? "-error" : ""}`}
                    id="password"
                    type={isPasswordHidden ? "password" : "text"}
                    value={password}
                    onChange={({ target }) => setPassword(target?.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                    onClick={() => setPasswordHidden((oldValue) => !oldValue)}
                  >
                    <ToggleEyeIcon isPasswordHidden={isPasswordHidden} />
                  </button>
                </div>
                <ErrorForm error={error} errorMsg={errorMessage} />
              </div>
              <div className="flex justify-between group">
                <label htmlFor="rememberMe" className="checkbox-container">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={({ target }) => setRememberMe(target.checked)}
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
                className="sign-in-btn"
                button-text="Sign in"
              />
              <div className="text-center">
                Don't have an account?
                <Link href="/signUp" className="font-semibold p-1">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
        <Image
          className="w-full object-cover -scale-x-100"
          src={coffeeMachineImg}
          alt="Coffee Machine"
          placeholder="blur"
        />
      </div>
    </>
  );
};

export default Login;

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
  rememberMe: boolean;
};

const Login: NextPage = () => {
  usePageAuthGuard();

  const [isPasswordHidden, setPasswordHidden] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  const supabase = useSupabaseClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
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
              <p className="text-m font-medium">
                Welcome back. Please enter your details
              </p>
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
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  className={`input-field ${!!errors.email ? "-error" : ""}`}
                  id="email"
                  type={"email"}
                  placeholder="Enter your email"
                />

                <ErrorForm
                  error={!!errors.email}
                  errorMsg={errors.email?.message}
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
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                    className={`input-field ${
                      !!errors.password ? "-error" : ""
                    }`}
                    id="password"
                    type={isPasswordHidden ? "password" : "text"}
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
                <ErrorForm
                  error={!!errors.password}
                  errorMsg={errors.password?.message}
                />
              </div>
              <div className="flex justify-between group">
                <label htmlFor="rememberMe" className="checkbox-container">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    {...register("rememberMe")}
                  />
                  <div className="checkmark" />
                  <div className="text" data-text="Remember me" />
                </label>
                <a href="#" className="font-semibold">
                  Forgot password
                </a>
              </div>

              {!!errorMessage && (
                <div className="flex w-full justify-center">
                  <ErrorForm error={!!errorMessage} errorMsg={errorMessage} />
                </div>
              )}

              <button
                type="submit"
                className="sign-in-btn"
                button-text="Sign in"
              />
              <div className="flex items-center justify-center gap-2">
                Don't have an account?
                <Link href="/signUp" className="font-semibold">
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

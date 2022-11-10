import type { NextPage } from "next";
import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import ErrorForm from "@components/ErrorForm";
import Link from "next/link";
import ToggleEyeIcon from "@components/ToggleEyeIcon";
import { usePageAuthGuard } from "@utils/pageGuard";
import Image from "next/image";
import coffeeMachineImg from "@public/coffeeMachine.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegex } from "@utils/regex";
import PasswordMeter from "@components/PasswordMeter";

type FormInputs = {
  email: string;
  fullName: string;
  password: string;
};

const SignUp: NextPage = () => {
  usePageAuthGuard();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormInputs>();

  const [isPasswordHidden, setPasswordHidden] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const watchPassword = watch("password", "");
  const supabase = useSupabaseClient();

  const onSubmit: SubmitHandler<FormInputs> = async ({
    email,
    password,
    fullName,
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="container-2xl h-screen flex justify-between">
        <div className="w-full relative flex justify-center items-center">
          <div className="w-[22rem] flex flex-col items-start bg-white gap-6 text-dark">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-bold">Create your account</h1>
              <p className="text-m font-medium">
                Create account to start using Esfreddo
              </p>
            </div>
            <form
              className="flex flex-col w-full gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-start gap-2">
                <label
                  htmlFor="fullName"
                  className="w-full text-base font-semibold"
                >
                  Full name
                </label>
                <input
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Full name is required",
                    },
                  })}
                  className={`input-field ${!!errors.fullName ? "-error" : ""}`}
                  id="fullName"
                  type={"fullName"}
                  placeholder="e.g. Babis Digos"
                />

                <ErrorForm
                  error={!!errors.fullName}
                  errorMsg={errors.fullName?.message}
                />
              </div>
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
                    pattern: { value: emailRegex, message: "Invalid email" },
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
                <PasswordMeter password={watchPassword} />

                <ErrorForm
                  error={!!errors.password}
                  errorMsg={errors.password?.message}
                />
              </div>

              {!!errorMessage && (
                <div className="flex w-full justify-center">
                  <ErrorForm error={!!errorMessage} errorMsg={errorMessage} />
                </div>
              )}
              <button
                type="submit"
                className="sign-in-btn"
                button-text="Create my account"
              />
              <div className="flex items-center justify-center gap-2">
                Already a user?
                <Link href="/login" className="font-semibold">
                  Login
                </Link>
              </div>
            </form>
          </div>
          <div className="absolute bottom-12 w-full text-center">
            By signing up, you agree to our{" "}
            <a href="#" className="font-medium underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium underline">
              Privacy Policy
            </a>
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

export default SignUp;

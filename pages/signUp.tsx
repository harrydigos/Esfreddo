import type { NextPage } from "next";
import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import ErrorForm from "@components/form/ErrorForm";
import Link from "next/link";
import ToggleEyeIcon from "@components/form/ToggleEyeIcon";
import { usePageAuthGuard } from "@utils/pageGuard";
import Image from "next/image";
import coffeeMachineImg from "@public/coffeeMachine.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegex } from "@utils/regex";
import PasswordMeter from "@components/password/PasswordMeter";
import ValidateEmail from "@components/form/ValidateEmail";
import FormSubmitBtn from "@components/buttons/FormSubmitBtn";
import classNames from "classnames";
import styles from "@components/form/formInput.module.scss";

type FormInputs = {
  email: string;
  fullName: string;
  password: string;
};

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
};

const SignUp: NextPage = () => {
  usePageAuthGuard();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<FormInputs>();

  const [validateEmail, setValidateEmail] = React.useState(false);
  const [isPasswordHidden, setPasswordHidden] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const watchPassword = watch("password", "");

  const supabase = useSupabaseClient();

  const onSubmit: SubmitHandler<FormInputs> = async ({ email, password, fullName }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: getURL(),
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setValidateEmail(true);
    reset({ email: "", password: "", fullName: "" });
  };

  return (
    <>
      <div className="container-2xl flex h-screen justify-between">
        <div className="relative flex w-full items-center justify-center">
          <div className="flex w-[22rem] flex-col items-start gap-6 bg-white text-dark">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-bold">Create your account</h1>
              <p className="text-m font-medium">Create account to start using Esfreddo</p>
            </div>
            <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="fullName" className="w-full text-base font-semibold">
                  Full name
                </label>
                <input
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Full name is required",
                    },
                  })}
                  className={classNames(styles.formInput, !!errors.fullName ? styles.__error : "")}
                  id="fullName"
                  type={"fullName"}
                  placeholder="e.g. Babis Digos"
                />

                <ErrorForm error={!!errors.fullName} errorMsg={errors.fullName?.message} />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="email" className="w-full text-base font-semibold">
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
                  className={classNames(styles.formInput, !!errors.email ? styles.__error : "")}
                  id="email"
                  type={"email"}
                  placeholder="Enter your email"
                />
                <ErrorForm error={!!errors.email} errorMsg={errors.email?.message} />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="password" className="w-full text-base font-semibold">
                  Password
                </label>
                <div className="relative flex w-full items-center justify-between gap-3">
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                    className={classNames(styles.formInput, styles.pswd, !!errors.password ? styles.__error : "")}
                    id="password"
                    type={isPasswordHidden ? "password" : "text"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                    onClick={() => setPasswordHidden((oldValue) => !oldValue)}
                  >
                    <ToggleEyeIcon isPasswordHidden={isPasswordHidden} />
                  </button>
                </div>
                <PasswordMeter password={watchPassword} />

                <ErrorForm error={!!errors.password} errorMsg={errors.password?.message} />
              </div>

              {!!errorMessage && <ErrorForm error={!!errorMessage} errorMsg={errorMessage} />}
              {validateEmail && <ValidateEmail message={"Account created!"} />}

              <FormSubmitBtn value={"Create my account"} />
              <div className="flex items-center justify-center gap-2">
                Already a user?
                <Link href="/login" className="font-semibold">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
        <Image
          className="w-full -scale-x-100 object-cover"
          src={coffeeMachineImg}
          alt="Coffee Machine"
          placeholder="blur"
        />
      </div>
    </>
  );
};

export default SignUp;

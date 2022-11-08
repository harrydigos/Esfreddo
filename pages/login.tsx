import type { NextPage } from "next";
import React from "react";
// import { ErrorForm } from "../components/errorForm";
import EyeIcon from "@components/icons/EyeIcon";
import EyeSlashIcon from "@components/icons/EyeSlashIcon";
import WarningIcon from "@components/icons/WarningIcon";
import type { LoginForm } from "@api/loginForm";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ToggleEyeIcon: React.FC<{ isPasswordHidden: boolean; }> = ({
  isPasswordHidden
}) => {

  if (isPasswordHidden) return <EyeIcon className="stroke-coffee-dark" />
  return <EyeSlashIcon className="stroke-coffee-dark" />
}

const useLoginPageAuthGuard = () => {
  const session = useSession();
  const { push } = useRouter();
  useEffect(() => {
    if (session) {
      push('/')
    }
  }, [session])
}


const Login: NextPage = () => {
  useLoginPageAuthGuard();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isPasswordHidden, setPasswordHidden] = React.useState(true);

  const supabase = useSupabaseClient();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: {
    //       full_name: 'Pantelis Elef'
    //     }
    //   }
    // })

    await supabase.auth.signInWithPassword({
      email,
      password
    })
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
              type={'email'}
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
                type={isPasswordHidden ? 'password' : 'text'}
                value={password}
                onChange={({ target }) => setPassword(target?.value)}
                placeholder="Enter your password"
              />


              <button type="button" className="absolute top-1/2 -translate-y-1/2 right-3" onClick={() => setPasswordHidden((oldValue) => !oldValue)}>
                <ToggleEyeIcon isPasswordHidden={isPasswordHidden} />
              </button>

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

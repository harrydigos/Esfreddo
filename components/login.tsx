import { FC } from "react";

type LoginProps = JSX.IntrinsicElements["div"];

export const LoginForm: FC<LoginProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl text-slate-800 font-bold mb-4">Login</h1>
        <form className="flex flex-col items-center justify-center w-full">
          <label className="w-full text-left text-slate-800 font-bold mb-2">
            Email
          </label>
          <input
            className="w-full border-2 border-slate-800 p-2 rounded mb-4"
            type="email"
            placeholder="Enter your email"
          />
          <label className="w-full text-left text-slate-800 font-bold mb-2">
            Password
          </label>
          <input
            className="w-full border-2 border-slate-800 p-2 rounded mb-4"
            type="password"
            placeholder="Enter your password"
          />
          <button
            className="w-full bg-slate-800 text-white p-2 rounded mb-4"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

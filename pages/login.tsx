import type { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-start bg-white gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p>Welcome back. Please enter your details</p>
        </div>
        <form className="flex flex-col w-full gap-6">
          <div className="flex flex-col items-start gap-2">
            <label className="w-full text-left font-medium">Email</label>
            <input
              className="w-full border-2 p-2 rounded"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="w-full text-left font-medium">Password</label>
            <input
              className="w-full border-2 p-2 rounded"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 border-2 border-coffee-dark accent-coffee-dark rounded hover:cursor-pointer" />
              <label>Remember me</label>
            </div>
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
              {" "}
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

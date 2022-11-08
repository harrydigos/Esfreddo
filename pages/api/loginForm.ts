import type { NextApiRequest, NextApiResponse } from "next";

export type LoginForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, rememberMe } = req.body as LoginForm;

    if (email === "" || password === "") {
      return res.status(400).json({ error: "Email and password are required" });
    }

    res
      .status(200)
      .json({
        msg: "Success",
        email: email,
        password: password,
        rememberMe: rememberMe,
      });
  }
}

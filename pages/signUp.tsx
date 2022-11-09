import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import React from "react";
import { usePageAuthGuard } from "utils/pageGuard";

const SignUp: NextPage = () => {
  usePageAuthGuard();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordHidden, setPasswordHidden] = React.useState(true);

  const supabase = useSupabaseClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: "Babis Digos",
        },
      },
    });
  };

  return (
    <div>
      <p>Sign Up</p>
    </div>
  );
};

export default SignUp;

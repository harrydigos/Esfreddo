import { useSession, useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const session = useSession();
  const user = useUser();

  console.log(session, user)

  return (
    <div className="flex justify-center items-center">
      {!session ? (
        <p>Not Logged</p>
      ) : (
        <p>Logged In</p>
      )}
    </div>
  );
};

export default Home;

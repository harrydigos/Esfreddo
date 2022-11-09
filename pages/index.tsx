import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const session = useSession();
  const user = useUser();

  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  console.log(session, user);

  return (
    <div className="container mx-auto flex h-screen justify-center items-center">
      {!session ? (
        <p>Not Logged</p>
      ) : (
        <>
          <p>Logged In</p>
          <button
            className="text-coffee-dark text-lg font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Home;

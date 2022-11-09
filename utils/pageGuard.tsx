import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Redirects the user to the home page if they are logged in.
 */
export const usePageAuthGuard = () => {
  const session = useSession();
  const { push } = useRouter();
  useEffect(() => {
    if (session) {
      push("/");
    }
  }, [session]);
};

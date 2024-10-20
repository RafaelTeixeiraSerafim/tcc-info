import { Session } from "@toolpad/core";
import { useMemo, useState } from "react";
import useUserContext from "./useUserContext";
import { useNavigate } from "react-router-dom";

export default function useDashboardAuth() {
  const { user, logoutUser } = useUserContext();
  const [session, setSession] = useState<Session | null>({
    user: {
      name: user?.username,
      email: user?.email,
      image: user?.profilePic,
    },
  });

  const navigate = useNavigate();

  const authentication = useMemo(() => {
    return {
      signIn: () => {},
      signOut: () => {
        setSession(null);
        logoutUser();
        navigate("/");
      },
    };
  }, [logoutUser, navigate]);

  return { session, authentication };
}

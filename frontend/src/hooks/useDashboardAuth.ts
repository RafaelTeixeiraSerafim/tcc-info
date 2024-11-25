import { Session } from "@toolpad/core";
import { useEffect, useMemo, useState } from "react";
import useUserContext from "./useUserContext";
import { useNavigate } from "react-router-dom";

export default function useDashboardAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const { user, logoutUser } = useUserContext();

  const navigate = useNavigate();

  const authentication = useMemo(() => {
    return {
      signIn: () => {},
      signOut: async () => {
        setSession(null);
        await logoutUser();
        navigate("/");
      },
    };
  }, [logoutUser, navigate]);

  useEffect(() => {
    setSession({
      user: {
        name: user?.username,
        email: user?.email,
        image: user?.profilePic,
      },
    });
  }, [user]);

  return { session, authentication };
}

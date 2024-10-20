import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks";

export default function LogoutRequired() {
  const [loggedOut, setLoggedOut] = useState(false);
  const { user, hasCheckedToken } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCheckedToken) return;
    if (user) {
      navigate("/");
    }
    setLoggedOut(true);
  }, [hasCheckedToken, navigate, user]);

  return <>{loggedOut && <Outlet />}</>;
}

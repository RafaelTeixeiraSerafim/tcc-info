import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function LogoutRequired() {
  const [loggedOut, setLoggedOut] = useState(false);
  const { user, hasCheckedToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCheckedToken) return;
    if (user) {
      navigate("/");
    }
    setLoggedOut(true);
  }, [hasCheckedToken]);

  return <>{loggedOut && <Outlet />}</>;
}

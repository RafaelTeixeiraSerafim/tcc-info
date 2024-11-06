import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks";

export default function LoginRequired() {
  const [hasPermission, setHasPermission] = useState(false);
  const { user, hasCheckedToken } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCheckedToken) return;
    if (!user) {
      navigate("/login");
    }
    setHasPermission(true);
  }, [hasCheckedToken, navigate, user]);

  return <>{hasPermission && <Outlet />}</>;
}

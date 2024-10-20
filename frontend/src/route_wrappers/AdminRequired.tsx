import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks";

export default function AdminRequired() {
  const [hasPermission, setHasPermission] = useState(false);
  const { user, hasCheckedToken } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCheckedToken) return;
    if (user?.role !== "ADMIN") {
      navigate("/");
    }
    setHasPermission(true);
  }, [hasCheckedToken, navigate, user]);

  return <>{hasPermission && <Outlet />}</>;
}

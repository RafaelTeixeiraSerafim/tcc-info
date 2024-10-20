import { Router } from "@toolpad/core";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDashboardAuth from "./useDashboardAuth";

export default function useDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authentication, session } = useDashboardAuth();

  const router = useMemo<Router>(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => navigate(String(path)),
    };
  }, [location.pathname, navigate]);

  return { router, authentication, session };
}

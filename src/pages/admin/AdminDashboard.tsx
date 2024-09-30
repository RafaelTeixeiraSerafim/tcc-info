import { Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

export default function AdminDashboard() {
  const location = useLocation();

  console.log(location.pathname);
  return <Typography variant="h3">Painel de Admin</Typography>;
}

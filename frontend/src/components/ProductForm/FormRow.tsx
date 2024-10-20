import { Box } from "@mui/material";
import React from "react";

interface FormRowProps {
  children: React.ReactNode;
}

export default function FormRow({ children }: FormRowProps) {
  return (
    <Box sx={{ width: "100%", display: "flex", gap: "1.5rem" }}>{children}</Box>
  );
}

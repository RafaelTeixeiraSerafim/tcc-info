import { Box } from "@mui/material";
import React from "react";

interface AuthFormActionsProps {
  children: React.ReactNode;
}

export default function AuthFormActions({ children }: AuthFormActionsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}

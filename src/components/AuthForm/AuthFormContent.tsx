import { Box } from "@mui/material";
import React from "react";

interface AuthFormContentProps {
  children: React.ReactNode;
}

export default function AuthFormContent({ children }: AuthFormContentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}

import { Paper } from "@mui/material";
import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Paper
      sx={{
        my: "4rem",
        marginInline: "auto",
        width: "30%",
        paddingBlock: "2rem",
        paddingInline: "1.5rem",
      }}
      elevation={5}
    >
      {children}
    </Paper>
  );
}

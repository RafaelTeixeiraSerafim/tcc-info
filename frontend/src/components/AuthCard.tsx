import { Paper } from "@mui/material";
import React, { CSSProperties } from "react";

interface AuthCardProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function AuthCard({ children, style }: AuthCardProps) {
  return (
    <Paper
      sx={{
        my: "4rem",
        marginInline: "auto",
        width: "30%",
        paddingBlock: "2rem",
        paddingInline: "1.5rem",
        ...style,
      }}
      elevation={5}
    >
      {children}
    </Paper>
  );
}

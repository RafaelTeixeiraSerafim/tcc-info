import { Box } from "@mui/material";
import React from "react";

interface ModalActionsProps {
  children: React.ReactNode;
}

export default function ModalActions({ children }: ModalActionsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
      }}
    >
      {children}
    </Box>
  );
}

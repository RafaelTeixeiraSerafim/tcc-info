import { Box } from "@mui/material";
import React from "react";

interface FormActionProps {
  children: React.ReactNode;
}

export default function FormActions({ children }: FormActionProps) {
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

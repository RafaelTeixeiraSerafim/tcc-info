import { Box } from "@mui/material";
import React, { CSSProperties } from "react";

interface FormActionProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function FormActions({ children, style }: FormActionProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        ...style,
      }}
    >
      {children}
    </Box>
  );
}

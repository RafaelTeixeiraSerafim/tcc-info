import { Box, Typography } from "@mui/material";
import React from "react";

interface NoRowsOverlayProps {
  children: React.ReactNode;
}

export default function NoRowsOverlay({ children }: NoRowsOverlayProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography>{children}</Typography>
    </Box>
  );
}

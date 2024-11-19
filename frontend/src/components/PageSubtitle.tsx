import { Box, Typography } from "@mui/material";
import TitleUnderline from "./TitleUnderline";
import React from "react";

interface PageSubtitleProps {
  children: React.ReactNode;
}

export default function PageSubtitle({ children }: PageSubtitleProps) {
  return (
    <Box>
      <Typography
        component={"h2"}
        sx={{ fontWeight: "bold", fontSize: "2.5rem" }}
      >
        {children}
      </Typography>
      <TitleUnderline />
    </Box>
  );
}

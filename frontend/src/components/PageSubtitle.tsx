import { Box, Typography, useTheme } from "@mui/material";
import TitleUnderline from "./TitleUnderline";
import React from "react";

interface PageSubtitleProps {
  children: React.ReactNode;
}

export default function PageSubtitle({ children }: PageSubtitleProps) {
  const theme = useTheme()
  
  return (
    <Box>
      <Typography
        component={"h2"}
        sx={{ fontWeight: "bold", fontSize: "2.5rem" }}
      >
        {children}
      </Typography>
      <TitleUnderline style={{color: theme.palette.primary.main}} />
    </Box>
  );
}

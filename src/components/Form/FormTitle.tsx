import { Typography } from "@mui/material";
import React from "react";

interface FormTitleProps {
  children: React.ReactNode
}

export default function FormTitle({ children }: FormTitleProps) {
  return (
    <Typography variant="h3" component={"h1"}>
      {children}
    </Typography>
  );
}

import { Typography, TypographyProps } from "@mui/material";
import React from "react";

interface FormTitleProps extends TypographyProps {
  children: React.ReactNode;
}

export default function FormTitle({ children, ...props }: FormTitleProps) {
  return (
    <Typography variant="h3" component={"h1"} {...props}>
      {children}
    </Typography>
  );
}

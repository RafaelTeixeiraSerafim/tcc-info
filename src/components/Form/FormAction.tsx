import { Button } from "@mui/material";
import React from "react";

interface FormActionProps {
  children: React.ReactNode;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "text" | "outlined" | "contained";
}

export default function FormAction({
  children,
  handleClick,
  variant,
}: FormActionProps) {
  return (
    <Button
      variant={variant}
      onClick={handleClick}
      sx={{
        flex: 1,
      }}
    >
      {children}
    </Button>
  );
}

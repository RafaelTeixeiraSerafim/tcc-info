import { Button } from "@mui/material";
import React from "react";

interface ModalActionProps {
  children: React.ReactNode;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "text" | "outlined" | "contained";
}

export default function ModalAction({
  children,
  handleClick,
  variant,
}: ModalActionProps) {
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

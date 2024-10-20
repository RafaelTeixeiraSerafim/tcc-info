import { Button } from "@mui/material";
import React from "react";

interface SubmitButtonProps {
  children: React.ReactNode;
}

export default function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        flex: 1,
      }}
    >
      {children}
    </Button>
  );
}

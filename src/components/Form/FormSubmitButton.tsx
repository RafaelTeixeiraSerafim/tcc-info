import { Button } from "@mui/material";
import React from "react";

interface FormSubmitButtonProps {
  children: React.ReactNode;
}

export default function FormSubmitButton({ children }: FormSubmitButtonProps) {
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

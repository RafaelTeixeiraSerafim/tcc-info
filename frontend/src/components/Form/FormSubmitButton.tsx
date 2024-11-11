import { Button } from "@mui/material";
import React, { CSSProperties } from "react";

interface FormSubmitButtonProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function FormSubmitButton({
  children,
  style,
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        flex: 1,
        ...style,
      }}
    >
      {children}
    </Button>
  );
}

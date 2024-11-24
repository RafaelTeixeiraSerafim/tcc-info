import { Button } from "@mui/material";
import React, { CSSProperties } from "react";

interface FormSubmitButtonProps {
  children: React.ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
}

export default function FormSubmitButton({
  children,
  style,
  disabled,
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        flex: 1,
        ...style,
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

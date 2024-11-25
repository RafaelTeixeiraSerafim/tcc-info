import { CircularProgress } from "@mui/material";
import React, { CSSProperties } from "react";
import Form from "./Form";
import useFormContext from "./useFormContext";

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
  const { loading } = useFormContext();

  return (
    <Form.Action
      type="submit"
      variant="contained"
      sx={{
        flex: 1,
        ...style,
      }}
      disabled={disabled || loading}
      startIcon={
        loading ? <CircularProgress size={20} color="inherit" /> : null
      }
    >
      {children}
    </Form.Action>
  );
}

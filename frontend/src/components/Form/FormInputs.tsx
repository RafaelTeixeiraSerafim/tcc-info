import { Stack, Typography } from "@mui/material";
import React, { CSSProperties } from "react";
import useFormContext from "./useFormContext";

interface FormInputProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function FormInputs({ children, style }: FormInputProps) {
  const { root } = useFormContext();

  return (
    <Stack
      sx={{
        gap: "inherit",
        width: "100%",
        ...style,
      }}
    >
      {children}
      {root?.error && (
        <Typography fontSize={"0.875rem"} color="error">
          {root.error}
        </Typography>
      )}
    </Stack>
  );
}

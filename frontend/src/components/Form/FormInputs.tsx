import { Stack, Typography } from "@mui/material";
import React, { CSSProperties } from "react";
import useFormContext from "./useFormContext";
import ErrorIcon from "@mui/icons-material/Error";

interface FormInputProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function FormInputs({ children, style }: FormInputProps) {
  const { root } = useFormContext();

  return (
    <Stack
      sx={{
        gap: "1rem",
        width: "100%",
      }}
    >
      <Stack
        sx={{
          gap: "2rem",
          width: "100%",
          ...style,
        }}
      >
        {children}
      </Stack>
      {root?.error && (
        <Stack direction={"row"} gap={"0.25rem"} alignItems={"center"}>
          <ErrorIcon fontSize="small" color="error" />
          <Typography color="error" fontSize={"0.875rem"}>
            {root.error}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

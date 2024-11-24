import { Box, FormControl } from "@mui/material";
import { AxiosError } from "axios";
import React, { CSSProperties, useEffect } from "react";
import { IAuthErrors } from "../../interfaces";
import useFormContext from "./useFormContext";

interface FormBaseProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  errors?: IAuthErrors;
  style?: CSSProperties;
}

export default function FormBase({
  errors,
  children,
  onSubmit,
  style,
}: FormBaseProps) {
  const { newError, clearErrors, registerErrors } = useFormContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    const form = event.currentTarget;
    const formData = new FormData(form);

    let hasError = false;

    for (const key in errors) {
      for (const error of errors[key]!) {
        if (error.onSubmit?.(formData.get(key) as string)) {
          newError(key, error.message);
          hasError = true;
          break;
        }
      }
    }
    if (!hasError) {
      try {
        await onSubmit(event);
      } catch (error) {
        for (const key in errors) {
          for (const fieldError of errors[key]!) {
            if (fieldError.onError?.(error as AxiosError)) {
              newError(key, fieldError.message);
              break;
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (errors) registerErrors(errors);
  }, [errors, registerErrors]);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          ...style,
          width: "100%",
        }}
      >
        {children}
      </FormControl>
    </Box>
  );
}

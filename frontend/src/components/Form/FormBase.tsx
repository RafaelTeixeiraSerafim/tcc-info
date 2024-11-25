import { Box, FormControl } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { CSSProperties, useEffect } from "react";
import { IAuthErrors } from "../../interfaces";
import useFormContext from "./useFormContext";

interface FormBaseProps {
  children: React.ReactNode;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    signal: AbortSignal
  ) => Promise<void> | void;
  errors?: IAuthErrors;
  style?: CSSProperties;
}

export default function FormBase({
  errors,
  children,
  onSubmit,
  style,
}: FormBaseProps) {
  const {
    newError,
    clearErrors,
    registerErrors,
    startLoading,
    endLoading,
    abortController,
  } = useFormContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLoading();
    clearErrors();

    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    const signal = abortController.current.signal;

    const form = event.currentTarget;
    const formData = new FormData(form);

    let hasError = false;

    for (const key in errors) {
      for (const error of errors[key]!) {
        if (error.onSubmit?.(formData.get(key) as string)) {
          endLoading();
          newError(key, error.message);
          hasError = true;
          break;
        }
      }
    }
    if (!hasError) {
      try {
        await onSubmit(event, signal);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Submission aborted.");
        } else {
          for (const key in errors) {
            for (const fieldError of errors[key]!) {
              if (fieldError.onError?.(error as AxiosError)) {
                newError(key, fieldError.message);
                break;
              }
            }
          }
        }
      } finally {
        endLoading();
      }
    }
  };

  useEffect(() => {
    if (errors) registerErrors(errors);
  }, [errors, registerErrors]);

  useEffect(() => {
    const cur = abortController.current;

    return () => cur.abort();
  }, [abortController]);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      onAbort={() => console.log("Abortando...")}
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

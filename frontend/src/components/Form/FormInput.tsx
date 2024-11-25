import ErrorIcon from "@mui/icons-material/Error";
import {
  Stack,
  TextField,
  TextFieldProps,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IField, IFieldError } from "../../interfaces";
import useFormContext from "./useFormContext";

type FormInputProps = TextFieldProps & {
  name: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

export default function FormInput({ name, onChange, ...rest }: FormInputProps) {
  const { registerInput, inputs, clearError, errors, newError } =
    useFormContext();
  const [input, setInput] = useState<IField | null>(null);
  const [inputErrors, setInputErrors] = useState<IFieldError[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    handleChangeError(event);
    onChange(event);
  };

  const handleChangeError = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const onChangeError = inputErrors.find((err) => err.onChange);
    console.log(name, onChangeError?.message);
    if (onChangeError) {
      if (onChangeError.onChange?.(event))
        newError(name, onChangeError.message);
      else clearError(name);
    } else {
      if (input?.error) clearError(name);
    }
  };

  useEffect(() => {
    console.log("Registering input: ", name);
    registerInput(name);
  }, [name, registerInput]);

  useEffect(() => {
    console.log(
      "New input: ",
      inputs.find((input) => input.name === name)
    );
    setInput(inputs.find((input) => input.name === name) || null);
  }, [inputs, name]);

  useEffect(() => {
    if (errors) setInputErrors(errors[name] || []);
  }, [errors, name]);

  return (
    <Stack gap="0.175rem">
      <TextField
        variant="standard"
        fullWidth
        name={name}
        onChange={handleChange}
        {...rest}
        error={Boolean(input?.error)}
      />
      {input?.error && (
        <Stack direction={"row"} gap={"0.25rem"} alignItems={"center"}>
          <ErrorIcon fontSize="small" color="error" />
          <Typography color="error" fontSize={"0.75rem"}>
            {input.error}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

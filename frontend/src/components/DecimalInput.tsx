import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type DecimalInputProps = TextFieldProps;

export default function DecimalInput(props: DecimalInputProps) {
  const { name, onChange, ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!name || !onChange) return;
    const value = e.target.value;

    // Regex to allow only numbers, commas for decimals, and periods for thousand separators
    if (value.charAt(value.length - 1) === ",") {
      e.target.value = value.slice(0, length - 1);
      console.log(value);
      onChange(e);
    } else if (value === "" || /^\d{1,5}(,\d{0,2})?$/.test(value)) {
      onChange(e);
    } else if (/^\d{5}\d/.test(value)) {
      const decimal = value.slice(5);
      const newValue = value.substring(0, 5) + "," + decimal;
      e.target.value = newValue;

      onChange(e);
    }
  };

  return (
    <TextField
      name={name}
      onChange={handleChange}
      placeholder="0,00"
      inputProps={{
        inputMode: "decimal", // This ensures the numeric keyboard on mobile devices
      }}
      {...rest}
    />
  );
}

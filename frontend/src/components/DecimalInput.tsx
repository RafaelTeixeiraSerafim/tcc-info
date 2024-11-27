import { TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";

type DecimalInputProps = TextFieldProps & {
  maxDecimals?: number;
};

export default function DecimalInput(props: DecimalInputProps) {
  const { name, onChange, maxDecimals = 2, ...rest } = props;
  const [prevValue, setPrevValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!name || !onChange) return;
    const value = e.target.value;

    const decimalRegex = new RegExp(`^\\d{1,5}(,\\d{0,${maxDecimals}})?$`);
    if (
      value.length < prevValue.length &&
      value.charAt(value.length - 1) === ","
    ) {
      e.target.value = value.slice(0, length - 1);
      console.log(value);
      setPrevValue(value);
      onChange(e);
    } else if (value === "" || decimalRegex.test(value)) {
      setPrevValue(value);
      onChange(e);
    } else if (/^\d{5}\d/.test(value)) {
      const decimal = value.slice(5);
      const newValue = value.substring(0, 5) + "," + decimal;
      e.target.value = newValue;

      setPrevValue(newValue);
      onChange(e);
    }
  };

  return (
    <TextField
      name={name}
      onChange={handleChange}
      placeholder={"0," + "0".repeat(maxDecimals)}
      inputProps={{
        inputMode: "decimal", // This ensures the numeric keyboard on mobile devices
      }}
      {...rest}
    />
  );
}

import { TextField } from "@mui/material";
import React, { CSSProperties } from "react";
import { IFormProduct } from "../interfaces";

interface PriceInputProps {
  label: string;
  name: string;
  value: string;
  setFormProduct: React.Dispatch<React.SetStateAction<IFormProduct>>;
  style?: CSSProperties;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function PriceInput({
  label,
  name,
  value,
  setFormProduct,
  style,
  required,
  disabled,
  fullWidth,
}: PriceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regex to allow only numbers, commas for decimals, and periods for thousand separators
    if (value === "" || /^\d{1,5}(,\d{0,2})?$/.test(value)) {
      setFormProduct((prevProduct) => {
        return {
          ...prevProduct,
          [name]: value,
        };
      });
    } else if (/^\d{5}\d/.test(value)) {
      const decimal = value.slice(5);
      const newValue = value.substring(0, 5) + "," + decimal;

      setFormProduct((prevProduct) => {
        return {
          ...prevProduct,
          [name]: newValue,
        };
      });
    }
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      placeholder="0,00"
      inputProps={{
        inputMode: "decimal", // This ensures the numeric keyboard on mobile devices
      }}
      sx={{
        ...style,
      }}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
    />
  );
}

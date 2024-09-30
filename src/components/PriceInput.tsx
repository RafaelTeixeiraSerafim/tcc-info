import { TextField } from "@mui/material";
import React from "react";
import { IFormProduct } from "../interfaces";

interface PriceInputProps {
  label: string;
  name: string;
  formProduct: IFormProduct;
  setFormProduct: React.Dispatch<React.SetStateAction<IFormProduct>>;
  required?: boolean
  disabled?: boolean
}

export default function PriceInput({
  label,
  name,
  formProduct,
  setFormProduct,
  required,
  disabled
}: PriceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regex to allow only numbers, commas for decimals, and periods for thousand separators
    if (value === "" || /^\d{1,5}(,\d{0,2})?$/.test(value)) {
      setFormProduct({
        ...formProduct,
        [name]: value,
      });
    } else if (/^\d{5}\d/.test(value)) {
      const decimal = value.slice(5);
      const newValue = value.substring(0, 5) + "," + decimal;

      setFormProduct({
        ...formProduct,
        [name]: newValue,
      });
    } 
  };

  return (
    <TextField
      label={label}
      value={formProduct[name as keyof IFormProduct]}
      onChange={handleChange}
      placeholder="0,00"
      inputProps={{
        inputMode: "decimal", // This ensures the numeric keyboard on mobile devices
      }}
      sx={{
        flex: 1
      }}
      required={required}
      disabled={disabled}
    />
  );
}

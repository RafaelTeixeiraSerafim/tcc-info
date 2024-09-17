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

  const formatForBackend = (value: string) => {
    // Convert the value to a number (replace '.' and ',' correctly)
    return value.replace(/\./g, "").replace(",", ".");
  };

  const handleBlur = () => {
    const numericValue = formatForBackend(
      formProduct[name as keyof IFormProduct] as string
    );
    console.log("Numeric value for backend:", numericValue); // Use numericValue for backend calls
  };

  return (
    <TextField
      label={label}
      value={formProduct[name as keyof IFormProduct]}
      onChange={handleChange}
      onBlur={handleBlur}
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

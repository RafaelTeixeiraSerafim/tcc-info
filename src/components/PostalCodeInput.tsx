import { TextField } from "@mui/material";
import React from "react";
import { IFormAddress } from "../interfaces";
import { usePostalCodeInput } from "../hooks";

interface PostalCodeInputProps {
  postalCode: string;
  setAddress: React.Dispatch<React.SetStateAction<IFormAddress>>;
}

export default function PostalCodeInput({
  postalCode,
  setAddress,
}: PostalCodeInputProps) {
  const { handleChange } = usePostalCodeInput(postalCode, setAddress);

  return (
    <TextField
      label="CEP"
      required
      name="postalCode"
      value={postalCode}
      onChange={handleChange}
      inputMode="numeric"
    />
  );
}

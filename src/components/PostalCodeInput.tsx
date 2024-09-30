import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { IFormAddress } from "../interfaces";
import axiosInstance from "../config/axiosInstance";

interface PostalCodeInputProps {
  address: IFormAddress;
  setAddress: React.Dispatch<React.SetStateAction<IFormAddress>>;
}

export default function PostalCodeInput({
  address,
  setAddress,
}: PostalCodeInputProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    if (numericValue.length > 8) return;

    setAddress({ ...address, postalCode: numericValue });
  };

  const getAddress = async (postalCode: string) => {
    try {
      const response = await axiosInstance.get(
        `api/v1/addresses/postal/${postalCode}`
      );
      console.log(response);
      setAddress({
        ...address,
        state: response.data.state,
        city: response.data.city,
        neighbourhood: response.data.neighbourhood,
        street: response.data.street,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (address.postalCode.length !== 8) return;

    getAddress(address.postalCode);
  }, [address.postalCode]);

  return (
    <TextField
      label="CEP"
      required
      name="postalCode"
      value={address.postalCode}
      onChange={handleChange}
      inputMode="numeric"
    />
  );
}

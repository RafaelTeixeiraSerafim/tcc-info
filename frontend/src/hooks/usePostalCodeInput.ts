import React, { useEffect } from "react";
import { IFormAddress } from "../interfaces";
import axiosInstance from "../config/axiosInstance";

export default function usePostalCodeInput(
  postalCode: string,
  setAddress: React.Dispatch<React.SetStateAction<IFormAddress>>
) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    if (numericValue.length > 8) return;

    setAddress((prevAddress) => {
      return { ...prevAddress, postalCode: numericValue };
    });
  };

  const getAddress = async (postalCode: string) => {
    try {
      const response = await axiosInstance.get(
        `/addresses/postal-code/${postalCode}`
      );
      console.log(response);
      setAddress((prevAddress) => {
        return {
          ...prevAddress,
          state: response.data.state,
          city: response.data.city,
          neighbourhood: response.data.neighbourhood,
          street: response.data.street,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (postalCode.length !== 8) return;

    getAddress(postalCode);
  }, [postalCode]);

  return { handleChange };
}

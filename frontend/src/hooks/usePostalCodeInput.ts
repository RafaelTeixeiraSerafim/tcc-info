import React, { useEffect } from "react";
import axiosInstance from "../config/axiosInstance";
import { IFormAddress } from "../interfaces";
import { formatPostalCode, sanitizePostalCode } from "../utils/helpers";

export default function usePostalCodeInput(
  postalCode: string,
  setAddress: React.Dispatch<React.SetStateAction<IFormAddress>>
) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddress((prevAddress) => {
      return {
        ...prevAddress,
        postalCode: formatPostalCode(e.target.value),
        state: "",
        city: "",
        neighbourhood: "",
        street: "",
        houseNumber: "",
      };
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
    if (postalCode.length !== 9) return;

    getAddress(sanitizePostalCode(postalCode));
  }, [postalCode]);

  return { handleChange };
}

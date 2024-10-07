import React, { useEffect } from "react";
import { createContext, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IAddress, IFormAddress } from "../interfaces";
import { emptyFormAddress } from "../utils/emptyInterfaces";

interface AddressProviderProps {
  children: React.ReactElement;
}

interface AddressContextInterface {
  incompleteAddress: IFormAddress | null;
  selectedAddress: IAddress | null;
  getFromLocalStorage: () => void;
}

const AddressContext = createContext<AddressContextInterface | null>(null);

function AddressProvider({ children }: AddressProviderProps) {
  const [incompleteAddress, setIncompleteAddress] =
    useState<IFormAddress | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);

  const getAddress = async (addressId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/addresses/${addressId}`
      );
      console.log(response);
      setSelectedAddress(response.data);
      setIncompleteAddress(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getAddressByPostalCode = async (postalCode: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/addresses/postal/${postalCode}`
      );
      console.log(response);
      setIncompleteAddress({
        ...emptyFormAddress,
        postalCode: postalCode,
        state: response.data.state,
        city: response.data.city,
        neighbourhood: response.data.neighbourhood,
        street: response.data.street,
      });
      setSelectedAddress(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getFromLocalStorage = () => {
    const selectedAddressId = localStorage.getItem("selectedAddressId");
    if (selectedAddressId) {
      getAddress(selectedAddressId);
    } else {
      const postalCode = localStorage.getItem("postalCode");
      if (postalCode) getAddressByPostalCode(postalCode);
    }
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        incompleteAddress,
        selectedAddress,
        getFromLocalStorage
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export default AddressContext;
export { AddressProvider };

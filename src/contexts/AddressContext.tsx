import React, { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import { IAddress, IFormAddress } from "../interfaces";
import { emptyFormAddress } from "../utils/formDefaults";
import {
  deleteAddress,
  fetchAddress,
  fetchAddressByPostalCode,
  fetchUserAddresses,
} from "../service/api";
import { AxiosError } from "axios";
import { useUserContext } from "../hooks";

interface AddressProviderProps {
  children: React.ReactElement;
}

interface AddressContextInterface {
  incompleteAddress: IFormAddress | null;
  selectedAddress: IAddress | null;
  getFromLocalStorage: () => void;
  postalCode: string | null;
  userAddresses: IAddress[];
  handleDelete: (addressId: number) => Promise<void>;
  getAddresses: (userId: number) => Promise<void>;
  setSelectedAddressById: (id: number) => void;
  clearSelectedAddress: () => void;
}

const AddressContext = createContext<AddressContextInterface | null>(null);

function AddressProvider({ children }: AddressProviderProps) {
  const [incompleteAddress, setIncompleteAddress] =
    useState<IFormAddress | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [userAddresses, setUserAddresses] = useState<IAddress[]>([]);

  const { user } = useUserContext();

  const postalCode =
    incompleteAddress?.postalCode || selectedAddress?.postalCode || null;

  console.log(postalCode);

  const getAddresses = async (userId: number) => {
    try {
      const addresses = await fetchUserAddresses(userId);
      setUserAddresses(addresses);
    } catch (error) {
      alert(
        `Erro ao pegar os endereços do usuário: ${(error as AxiosError).message}`
      );
    }
  };

  const handleDelete = async (addressId: number) => {
    try {
      await deleteAddress(addressId);
      setUserAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== addressId)
      );
    } catch (error) {
      alert(`Erro ao deletar endereço: ${(error as AxiosError).message}`);
    }
  };

  const getAddress = async (addressId: number) => {
    try {
      const address = await fetchAddress(addressId);
      setSelectedAddress(address);
      setIncompleteAddress(null);
    } catch (error) {
      alert(`Erro ao pegar endereço: ${(error as AxiosError).message}`);
    }
  };

  const getAddressByPostalCode = async (postalCode: string) => {
    try {
      const address = await fetchAddressByPostalCode(postalCode);
      setIncompleteAddress({
        ...emptyFormAddress,
        postalCode: postalCode,
        state: address.state,
        city: address.city,
        neighbourhood: address.neighbourhood,
        street: address.street,
      });
      setSelectedAddress(null);
    } catch (error) {
      alert(
        `Erro ao pegar endereço pelo cep: ${(error as AxiosError).message}`
      );
    }
  };

  const setSelectedAddressById = useCallback(
    (id: number) => {
      const address = userAddresses.find((address) => address.id === id);
      if (!address) throw Error(`Endereço com id ${id} não foi encontrado`);

      setSelectedAddress(address);
      setIncompleteAddress(null);
    },
    [userAddresses]
  );

  const clearSelectedAddress = useCallback(() => setSelectedAddress(null), []);

  const getFromLocalStorage = useCallback(() => {
    const selectedAddressId = localStorage.getItem("selectedAddressId");
    if (selectedAddressId) {
      getAddress(parseInt(selectedAddressId));
    } else {
      const postalCode = localStorage.getItem("postalCode");
      if (postalCode) getAddressByPostalCode(postalCode);
    }
  }, []);

  useEffect(() => {
    getFromLocalStorage();
  }, [getFromLocalStorage]);

  useEffect(() => {
    if (!user) return;
    getAddresses(user.id);
  }, [user]);

  return (
    <AddressContext.Provider
      value={{
        incompleteAddress,
        selectedAddress,
        getFromLocalStorage,
        postalCode,
        userAddresses,
        handleDelete,
        getAddresses,
        setSelectedAddressById,
        clearSelectedAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export default AddressContext;
export { AddressProvider };

import React, { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import { IAddress, IFormAddress, IShippingOption } from "../interfaces";
import { emptyFormAddress } from "../utils/formDefaults";
import {
  deleteAddress,
  fetchAddressByPostalCode,
  fetchShippingOptions,
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
  changeSelectedAddressById: (id: number) => void;
  clearSelectedAddress: () => void;
  shippingOptions: IShippingOption[];
  selectedShippingOption: IShippingOption | null;
  changeSelectedShippingOption: (shippingOption: IShippingOption) => void;
}

const AddressContext = createContext<AddressContextInterface | null>(null);

function AddressProvider({ children }: AddressProviderProps) {
  const [incompleteAddress, setIncompleteAddress] =
    useState<IFormAddress | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [userAddresses, setUserAddresses] = useState<IAddress[]>([]);
  const [shippingOptions, setShippingOptions] = useState<IShippingOption[]>([]);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState<IShippingOption | null>(null);

  const { user } = useUserContext();

  const postalCode =
    incompleteAddress?.postalCode || selectedAddress?.postalCode || null;

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
      localStorage.setItem("addressId", address.id.toString());
    },
    [userAddresses]
  );

  const changeSelectedAddressById = useCallback(
    (id: number) => {
      setSelectedAddressById(id);
      if (selectedShippingOption) localStorage.removeItem("shippingOptionId");
    },
    [selectedShippingOption, setSelectedAddressById]
  );

  const clearSelectedAddress = useCallback(() => setSelectedAddress(null), []);

  const getFromLocalStorage = useCallback(() => {
    const selectedAddressId = localStorage.getItem("addressId");
    if (selectedAddressId) {
      setSelectedAddressById(parseInt(selectedAddressId));
    } else {
      const postalCode = localStorage.getItem("postalCode");
      if (postalCode) getAddressByPostalCode(postalCode);
    }
    const selectedShippingOptionId = localStorage.getItem("shippingOptionId");

    if (selectedShippingOptionId && shippingOptions)
      setSelectedShippingOption(
        shippingOptions.find(
          (option) => option.id === parseInt(selectedShippingOptionId)
        )!
      );
  }, [changeSelectedAddressById, shippingOptions]);

  const getShippingOptions = async (userId: number, postalCode: string) => {
    try {
      const shippingOptions = await fetchShippingOptions(userId, postalCode);
      setShippingOptions(shippingOptions);

      if (shippingOptions.length > 0) {
        let tempOption = {
          id: 0,
          name: "",
          price: Number.MAX_SAFE_INTEGER.toString(),
          deliveryTime: 0,
        };

        shippingOptions.map((option) => {
          if (parseFloat(option.price) < parseFloat(tempOption.price))
            tempOption = option;
        });

        setSelectedShippingOption(tempOption);
      }
    } catch (error) {
      alert(`Erro ao calcular o frete: ${(error as AxiosError).message}`);
    }
  };

  const changeSelectedShippingOption = (shippingOption: IShippingOption) => {
    setSelectedShippingOption(shippingOption);
    localStorage.setItem("shippingOptionId", shippingOption.id.toString());
  };

  useEffect(() => {
    if (userAddresses.length > 0) getFromLocalStorage();
  }, [getFromLocalStorage, userAddresses]);

  useEffect(() => {
    if (!user) return;
    getAddresses(user.id);
  }, [user]);

  useEffect(() => {
    if (!user || !postalCode) return;
    getShippingOptions(user.id, postalCode);
  }, [user, postalCode]);

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
        changeSelectedAddressById,
        clearSelectedAddress,
        shippingOptions,
        selectedShippingOption,
        changeSelectedShippingOption,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export default AddressContext;
export { AddressProvider };

import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { AddressContext } from ".";
import { useUserContext } from "../hooks";
import { IAddress, IFormAddress, IShippingOption } from "../interfaces";
import {
  deleteAddress,
  fetchAddressByPostalCode,
  fetchShippingOptions,
  fetchUserAddresses,
} from "../service/api";
import { emptyFormAddress } from "../utils/formDefaults";

interface AddressProviderProps {
  children: React.ReactElement;
}

function AddressProvider({ children }: AddressProviderProps) {
  const [incompleteAddress, setIncompleteAddress] =
    useState<IFormAddress | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [userAddresses, setUserAddresses] = useState<IAddress[]>([]);
  const [shippingOptions, setShippingOptions] = useState<IShippingOption[]>([]);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState<IShippingOption | null>(null);

  const { user, newAlert } = useUserContext();

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
      newAlert("Endereço excluido", "filled", "error")
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
      if (userAddresses.length === 0) return
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
    console.log({ selectedAddressId });
    if (selectedAddressId) {
      setSelectedAddressById(parseInt(selectedAddressId));
    } else {
      const postalCode = localStorage.getItem("postalCode");
      console.log({ postalCode });
      if (postalCode) getAddressByPostalCode(postalCode);
    }
    const selectedShippingOptionId = localStorage.getItem("shippingOptionId");

    if (selectedShippingOptionId && shippingOptions)
      setSelectedShippingOption(
        shippingOptions.find(
          (option) => option.id === parseInt(selectedShippingOptionId)
        )!
      );
  }, [shippingOptions, setSelectedAddressById]);

  const getShippingOptions = async (userId: number, postalCode: string) => {
    try {
      const shippingOptions = await fetchShippingOptions(userId, postalCode);
      setShippingOptions(shippingOptions);

      if (shippingOptions.length > 0) {
        let tempOption = {
          id: 0,
          name: "",
          price: Number.MAX_SAFE_INTEGER.toString(),
          deliveryMinDays: 0,
          deliveryMaxDays: 0,
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
    if (!user) return;
    getAddresses(user.id);
  }, [user]);

  useEffect(() => {
    // if (userAddresses.length > 0)
    getFromLocalStorage();
  }, [getFromLocalStorage]);

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

export default AddressProvider;

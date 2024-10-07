import { Button } from "@mui/material";
import React, { useState } from "react";
import SelectAddressModal from "./SelectAddressModal";
import useAddressContext from "../hooks/useAddressContext";

export default function AddressDisplay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedAddress, incompleteAddress, getFromLocalStorage } =
    useAddressContext();
  // const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  // const [incompleteAddress, setIncompleteAddress] =
  //   useState<IFormAddress | null>(null);

  // const getAddress = async (addressId: string) => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/api/v1/addresses/${addressId}`
  //     );
  //     console.log(response);
  //     setSelectedAddress(response.data);
  //     setIncompleteAddress(null);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getAddressByPostalCode = async (postalCode: string) => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/api/v1/addresses/postal/${postalCode}`
  //     );
  //     console.log(response);
  //     setIncompleteAddress({
  //       ...emptyFormAddress,
  //       postalCode: postalCode,
  //       state: response.data.state,
  //       city: response.data.city,
  //       neighbourhood: response.data.neighbourhood,
  //       street: response.data.street,
  //     });
  //     setSelectedAddress(null);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getFromLocalStorage = () => {
  //   const selectedAddressId = localStorage.getItem("selectedAddressId");
  //   if (selectedAddressId) {
  //     getAddress(selectedAddressId);
  //   } else {
  //     const postalCode = localStorage.getItem("postalCode");
  //     if (postalCode) getAddressByPostalCode(postalCode);
  //   }
  // };

  // useEffect(() => {
  //   getFromLocalStorage();
  // }, []);

  return (
    <>
      {selectedAddress || incompleteAddress ? (
        <Button onClick={() => setIsModalOpen(true)}>
          {selectedAddress
            ? selectedAddress.fullName
            : incompleteAddress?.postalCode}
        </Button>
      ) : (
        <Button onClick={() => setIsModalOpen(true)}>
          Escolha um endereço
        </Button>
      )}
      <SelectAddressModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedAddress={selectedAddress ? selectedAddress : undefined}
        incompleteAddress={incompleteAddress ? incompleteAddress : undefined}
        updateFunction={getFromLocalStorage}
      />
    </>
  );
}

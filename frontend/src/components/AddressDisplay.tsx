import { Button } from "@mui/material";
import { useState } from "react";
import SelectAddressModal from "./SelectAddressModal";
import useAddressContext from "../hooks/useAddressContext";

export default function AddressDisplay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedAddress, incompleteAddress, getFromLocalStorage } =
    useAddressContext();

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
        updateFunction={getFromLocalStorage}
      />
    </>
  );
}

import { Button } from "@mui/material";
import { useState } from "react";
import SelectAddressModal from "./SelectAddressModal";
import useAddressContext from "../hooks/useAddressContext";
import PlaceIcon from "@mui/icons-material/Place";

export default function AddressDisplay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedAddress, incompleteAddress, getFromLocalStorage } =
    useAddressContext();

  return (
    <>
      {selectedAddress || incompleteAddress ? (
        <Button onClick={() => setIsModalOpen(true)} sx={{
          gap: "0.125rem"
        }}>
          <PlaceIcon fontSize="small" />
          {selectedAddress
            ? selectedAddress.street + ", " + selectedAddress.houseNumber
            : incompleteAddress?.street}
        </Button>
      ) : (
        <Button onClick={() => setIsModalOpen(true)}>
          <PlaceIcon />
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

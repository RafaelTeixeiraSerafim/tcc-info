import { Button } from "@mui/material";
import { useState } from "react";
import SelectAddressModal from "./SelectAddressModal";
import useAddressContext from "../hooks/useAddressContext";
import PlaceIcon from "@mui/icons-material/Place";

export default function AddressDisplay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedAddress, incompleteAddress } = useAddressContext();

  return (
    <>
      {selectedAddress || incompleteAddress ? (
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            gap: "0.125rem",
          }}
        >
          <PlaceIcon fontSize="small" />
          {selectedAddress
            ? selectedAddress.street + ", " + selectedAddress.houseNumber
            : (incompleteAddress?.street || "").length > 0
              ? incompleteAddress?.street
              : incompleteAddress?.city}
        </Button>
      ) : (
        <Button onClick={() => setIsModalOpen(true)}>
          <PlaceIcon fontSize="small" />
          Escolha um endereço
        </Button>
      )}
      <SelectAddressModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  );
}

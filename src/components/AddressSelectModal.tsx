import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddressList from "./AddressList";
import { IAddress, IFormAddress } from "../interfaces";
import UserContext from "../contexts/UserContext";
import axiosInstance from "../config/axiosInstance";
import AddressModal from "./AddressModal";
import PostalCodeInput from "./PostalCodeInput";
import { emptyFormAddress } from "../utils/emptyInterfaces";

interface AddressSelectModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateFunction: () => void;
  selectedAddress?: IAddress;
  incompleteAddress?: IFormAddress;
}

export default function AddressSelectModal({
  isOpen,
  setIsOpen,
  updateFunction,
  selectedAddress,
  incompleteAddress,
}: AddressSelectModalProps) {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [addressToUpdate, setAddressToUpdate] = useState<IAddress | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [formAddress, setFormAddress] =
    useState<IFormAddress>(emptyFormAddress);
  const [newAddressDefaultValues, setNewAddressDefaultValues] =
    useState<IFormAddress | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);

  const { user } = useContext(UserContext);

  const getAddresses = async () => {
    if (!user) return;

    try {
      const response = await axiosInstance.get(
        "/api/v1/addresses?userId=" + user.id
      );
      console.log(response);
      setAddresses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewAddress = () => {
    setNewAddressDefaultValues(formAddress);
    setIsAddressModalOpen(true);
  };

  const handleSave = () => {
    localStorage.removeItem("postalCode");
    localStorage.setItem("selectedAddressId", selectedAddressId.toString());
    updateFunction();
    setIsOpen(false);
  };

  const handleUseIncompletePostal = () => {
    setSelectedAddressId(0);
    localStorage.removeItem("selectedAddressId");
    localStorage.setItem("postalCode", formAddress.postalCode);
    updateFunction();
    setIsOpen(false);
  };

  useEffect(() => {
    getAddresses();
  }, [user?.id]);

  useEffect(() => {
    if (!selectedAddress) return;

    setSelectedAddressId(selectedAddress.id);
  }, [selectedAddress?.id]);

  useEffect(() => {
    if (!incompleteAddress?.postalCode) return;

    setFormAddress(incompleteAddress);
  }, [incompleteAddress?.postalCode]);

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography>Escolha um endereço</Typography>
        <AddressList
          addresses={addresses}
          setAddresses={setAddresses}
          setAddressToUpdate={setAddressToUpdate}
          setIsModalOpen={setIsAddressModalOpen}
          selectedAddressId={selectedAddressId}
          setSelectedAddressId={setSelectedAddressId}
        />
        <Box>
          <Box>
            <PostalCodeInput
              address={formAddress}
              setAddress={setFormAddress}
            />
            <Button
              onClick={handleUseIncompletePostal}
              variant="outlined"
              disabled={!formAddress.state}
            >
              Usar
            </Button>
          </Box>
          <Typography>{formAddress.street}</Typography>
          <Typography>{formAddress.city}</Typography>
          <Button onClick={handleNewAddress}>
            Adicionar endereço completo
          </Button>
          <Box>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Salvar
            </Button>
          </Box>
        </Box>
        <AddressModal
          isOpen={isAddressModalOpen}
          setIsOpen={setIsAddressModalOpen}
          onUpdateAddresses={getAddresses}
          addressToUpdate={addressToUpdate ? addressToUpdate : undefined}
          setAddressToUpdate={setAddressToUpdate}
          newAddressDefaultValues={
            newAddressDefaultValues ? newAddressDefaultValues : undefined
          }
          setNewAddressDefaultValues={setNewAddressDefaultValues}
        />
      </Box>
    </Modal>
  );
}

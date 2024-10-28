import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAddressContext, useUserContext } from "../hooks";
import { IAddress, IFormAddress } from "../interfaces";
import { emptyFormAddress } from "../utils/formDefaults";
import AddressList from "./AddressList";
import AddressModal from "./AddressModal";
import Form from "./Form";
import Modal from "./Modal";
import PostalCodeInput from "./PostalCodeInput";

interface SelectAddressModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateFunction: () => void;
}

export default function SelectAddressModal({
  isOpen,
  setIsOpen,
  updateFunction,
}: SelectAddressModalProps) {
  const [addressToUpdate, setAddressToUpdate] = useState<IAddress | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [formAddress, setFormAddress] =
    useState<IFormAddress>(emptyFormAddress);
  const [newAddressDefaultValues, setNewAddressDefaultValues] =
    useState<IFormAddress | null>(null);

  const { user } = useUserContext();
  const {
    getAddresses,
    selectedAddress,
    incompleteAddress,
    changeSelectedAddressById,
    clearSelectedAddress,
  } = useAddressContext();

  const handleNewAddress = () => {
    setNewAddressDefaultValues(formAddress);
    setIsAddressModalOpen(true);
  };

  const handleSave = () => {
    if (!selectedAddress) return;
    localStorage.removeItem("postalCode");
    localStorage.setItem("selectedAddressId", selectedAddress.id.toString());
    updateFunction();
    setIsOpen(false);
  };

  const handleUseIncompletePostal = () => {
    clearSelectedAddress();
    localStorage.removeItem("selectedAddressId");
    localStorage.setItem("postalCode", formAddress.postalCode);
    updateFunction();
    setIsOpen(false);
  };

  const handleClose = (
    isUpdating: boolean,
    hasDefaultValues: boolean,
    clearAddress: () => void
  ) => {
    if (isUpdating) {
      setAddressToUpdate?.(null);
      clearAddress();
    }
    if (hasDefaultValues) {
      setNewAddressDefaultValues?.(null);
      clearAddress();
    }
    setIsAddressModalOpen(false);
  };

  const handleUpdate = (addressToUpdate: IAddress) => {
    setAddressToUpdate(addressToUpdate);
    setIsAddressModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSelectedAddressById(parseInt(e.target.value));
  };

  const handleUpdateAddresses = () => {
    if (!user) return;
    getAddresses(user.id);
  };

  useEffect(() => {
    if (!incompleteAddress?.postalCode) return;

    setFormAddress(incompleteAddress);
  }, [incompleteAddress]);

  return (
    <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
      <Modal.Title>Escolha um endereço</Modal.Title>
      <AddressList
        selectedAddressId={selectedAddress?.id || 0}
        onChange={handleChange}
        onUpdate={handleUpdate}
      />
      <Form onSubmit={handleSave}>
        <Box>
          <PostalCodeInput
            postalCode={formAddress.postalCode}
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
        <Form.Action handleClick={handleNewAddress}>
          Adicionar endereço completo
        </Form.Action>
        <Form.Actions>
          <Modal.CancelButton />
          <Form.SubmitButton>Salvar</Form.SubmitButton>
        </Form.Actions>
      </Form>
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleClose}
        onUpdateAddresses={handleUpdateAddresses}
        addressToUpdate={addressToUpdate ? addressToUpdate : undefined}
        newAddressDefaultValues={
          newAddressDefaultValues ? newAddressDefaultValues : undefined
        }
      />
    </Modal>
  );
}

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressList from "./AddressList";
import { IAddress, IFormAddress } from "../interfaces";
import axiosInstance from "../config/axiosInstance";
import AddressModal from "./AddressModal";
import PostalCodeInput from "./PostalCodeInput";
import { emptyFormAddress } from "../utils/emptyInterfaces";
import Modal from "./Modal";
import { useUserContext } from "../hooks";

interface SelectAddressModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateFunction: () => void;
  selectedAddress?: IAddress;
  incompleteAddress?: IFormAddress;
}

export default function SelectAddressModal({
  isOpen,
  setIsOpen,
  updateFunction,
  selectedAddress,
  incompleteAddress,
}: SelectAddressModalProps) {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [addressToUpdate, setAddressToUpdate] = useState<IAddress | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [formAddress, setFormAddress] =
    useState<IFormAddress>(emptyFormAddress);
  const [newAddressDefaultValues, setNewAddressDefaultValues] =
    useState<IFormAddress | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);

  const { user } = useUserContext();

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

  const handleDelete = async (addressId: number) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/addresses/${addressId}`
      );
      console.log(response);
      setAddresses(addresses.filter((address) => address.id !== addressId));
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddressId(parseInt(e.target.value));
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
    <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
      <Modal.Title>Escolha um endereço</Modal.Title>
      <AddressList
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onChange={handleChange}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <Box>
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
        <Modal.Action handleClick={handleNewAddress}>
          Adicionar endereço completo
        </Modal.Action>
        <Modal.Actions>
          <Modal.Cancel />
          <Modal.Action variant="contained" handleClick={handleSave}>
            Salvar
          </Modal.Action>
        </Modal.Actions>
      </Box>
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleClose}
        onUpdateAddresses={getAddresses}
        addressToUpdate={addressToUpdate ? addressToUpdate : undefined}
        newAddressDefaultValues={
          newAddressDefaultValues ? newAddressDefaultValues : undefined
        }
      />
    </Modal>
  );
}

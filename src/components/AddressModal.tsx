import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IAddress, IFormAddress } from "../interfaces";
import PostalCodeInput from "./PostalCodeInput";
import { emptyFormAddress } from "../utils/emptyInterfaces";
import Modal from "./Modal";
import SubmitButton from "./SubmitButton";
import { useUserContext } from "../hooks";

interface AddressModalProps {
  isOpen: boolean;
  onClose: (
    isUpdating: boolean,
    hasDefaultValues: boolean,
    clearAddress: () => void
  ) => void;
  onUpdateAddresses: () => void;
  addressToUpdate?: IAddress;
  newAddressDefaultValues?: IFormAddress;
}

export default function AddressModal({
  isOpen,
  onClose,
  onUpdateAddresses,
  addressToUpdate,
  newAddressDefaultValues,
}: AddressModalProps) {
  const [address, setAddress] = useState<IFormAddress>(emptyFormAddress);

  const { user } = useUserContext();

  const isUpdating = Boolean(addressToUpdate);
  const hasDefaultValues = Boolean(newAddressDefaultValues);

  const clearAddress = () => setAddress(emptyFormAddress);
  const handleClose = () => onClose(isUpdating, hasDefaultValues, clearAddress);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    try {
      let request = axiosInstance.post;
      let url = "/api/v1/addresses";

      if (isUpdating) {
        request = axiosInstance.put;
        url += `/${addressToUpdate?.id}`;
      }

      const response = await request(url, {
        ...address,
        userId: user.id,
      });

      console.log(response);
      setAddress(emptyFormAddress);

      onUpdateAddresses();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isUpdating) return;
    setAddress(addressToUpdate!);
  }, [isUpdating]);

  useEffect(() => {
    if (!hasDefaultValues) return;
    setAddress(newAddressDefaultValues!);
  }, [hasDefaultValues]);

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <Modal.Title>Adicionar Endereço</Modal.Title>
      <Modal.Form handleSubmit={handleSubmit}>
        <TextField
          label="Nome Completo"
          required
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
        />
        <PostalCodeInput
          postalCode={address.postalCode}
          setAddress={setAddress}
        />
        <TextField
          label="Estado"
          required
          name="state"
          value={address.state}
          onChange={handleChange}
        />
        <TextField
          label="Cidade"
          required
          name="city"
          value={address.city}
          onChange={handleChange}
        />
        <TextField
          label="Bairro"
          required
          name="neighbourhood"
          value={address.neighbourhood}
          onChange={handleChange}
        />
        <TextField
          label="Rua/Avenida"
          required
          name="street"
          value={address.street}
          onChange={handleChange}
        />
        <TextField
          label="Número"
          required
          name="houseNumber"
          value={address.houseNumber}
          onChange={handleChange}
        />
        <TextField
          label="Complemeto"
          name="apartmentNumber"
          value={address.apartmentNumber}
          onChange={handleChange}
        />
        <TextField
          label="Telefone de contato"
          required
          name="contactPhone"
          value={address.contactPhone}
          onChange={handleChange}
        />
        <Modal.Actions>
          <Modal.Cancel />
          <SubmitButton>{isUpdating ? "Alterar" : "Criar"}</SubmitButton>
        </Modal.Actions>
      </Modal.Form>
    </Modal>
  );
}

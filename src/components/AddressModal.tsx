import { Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FormModal from "./FormModal";
import axiosInstance from "../config/axiosInstance";
import { IAddress, IFormAddress } from "../interfaces";
import UserContext from "../contexts/UserContext";
import PostalCodeInput from "./PostalCodeInput";
import { emptyFormAddress } from "../utils/emptyInterfaces";

interface AddressModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateAddresses: () => void;
  addressToUpdate?: IAddress;
  setAddressToUpdate?: React.Dispatch<React.SetStateAction<IAddress | null>>;
  newAddressDefaultValues?: IFormAddress;
  setNewAddressDefaultValues?: React.Dispatch<
    React.SetStateAction<IFormAddress | null>
  >;
}

export default function AddressModal({
  isOpen,
  setIsOpen,
  onUpdateAddresses,
  addressToUpdate,
  setAddressToUpdate,
  newAddressDefaultValues,
  setNewAddressDefaultValues,
}: AddressModalProps) {
  const [address, setAddress] = useState<IFormAddress>(emptyFormAddress);

  const { user } = useContext(UserContext);

  const isUpdating = Boolean(addressToUpdate);
  const hasDefaultValues = Boolean(newAddressDefaultValues);

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

  const handleClose = () => {
    if (isUpdating) {
      setAddressToUpdate?.(null);
      setAddress(emptyFormAddress);
    }
    if (hasDefaultValues) {
      setAddress(emptyFormAddress);
      setNewAddressDefaultValues?.(null);
    }
    setIsOpen(false);
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
    <FormModal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <FormControl>
        <Typography>Adicionar Endereço</Typography>
        <TextField
          label="Nome Completo"
          required
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
        />
        <PostalCodeInput address={address} setAddress={setAddress} />
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

        <Button type="submit" variant="contained">
          {isUpdating ? "Alterar" : "Criar"}
        </Button>
      </FormControl>
    </FormModal>
  );
}

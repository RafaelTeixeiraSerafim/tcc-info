import { Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IAddress, IFormAddress } from "../interfaces";
import PostalCodeInput from "./PostalCodeInput";
import { emptyFormAddress } from "../utils/formDefaults";
import Modal from "./Modal";
import { useUserContext } from "../hooks";
import Form from "./Form";
import { createAddress, updateAddress } from "../service/api";
import { AxiosError } from "axios";
import useForm from "../hooks/useForm";
import { formatPhone, formatPostalCode } from "../utils/helpers";

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
  const [address, setAddress] = useState<IFormAddress | IAddress>(
    addressToUpdate || newAddressDefaultValues || emptyFormAddress
  );

  const { user } = useUserContext();
  const { handleTextInputChange } = useForm<IFormAddress>();

  const isUpdating = Boolean(addressToUpdate);
  const hasDefaultValues = Boolean(newAddressDefaultValues);

  const clearAddress = () => setAddress(emptyFormAddress);
  const handleClose = () => onClose(isUpdating, hasDefaultValues, clearAddress);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    try {
      if (isUpdating) await updateAddress(address as IAddress);
      else await createAddress(address, user.id);

      setAddress(emptyFormAddress);

      onUpdateAddresses();
      handleClose();
    } catch (error) {
      alert(
        `Erro ${isUpdating ? "alterando" : "criando"} o endereço: ${(error as AxiosError).message}`
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleTextInputChange(e, setAddress);

  useEffect(() => {
    if (!addressToUpdate) return;

    setAddress(addressToUpdate);
  }, [addressToUpdate]);

  useEffect(() => {
    if (!newAddressDefaultValues) return;

    setAddress(newAddressDefaultValues);
  }, [newAddressDefaultValues]);

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <Modal.Title>Adicionar Endereço</Modal.Title>
      <Form onSubmit={handleSubmit} style={{ width: "80%", alignItems: "" }}>
        <TextField
          label="Nome Completo"
          required
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
        />
        <PostalCodeInput
          postalCode={formatPostalCode(address.postalCode)}
          setAddress={setAddress}
          required
        />
        <Stack direction={"row"} gap="1rem">
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
        </Stack>
        <TextField
          label="Bairro"
          required
          name="neighbourhood"
          value={address.neighbourhood}
          onChange={handleChange}
        />
        <Stack direction={"row"} gap="1rem">
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
        </Stack>
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
          value={formatPhone(address.contactPhone)}
          onChange={(e) => {
            e.target.value = formatPhone(e.target.value);
            handleChange(e);
          }}
        />
        <Form.Actions>
          <Modal.CancelButton />
          <Form.SubmitButton>
            {isUpdating ? "Alterar" : "Criar"}
          </Form.SubmitButton>
        </Form.Actions>
      </Form>
    </Modal>
  );
}

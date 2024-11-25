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
import { formatPostalCode, sanitizePostalCode } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

interface SelectAddressModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function SelectAddressModal({
  isOpen,
  closeModal,
}: SelectAddressModalProps) {
  const [addressToUpdate, setAddressToUpdate] = useState<IAddress | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [formAddress, setFormAddress] =
    useState<IFormAddress>(emptyFormAddress);
  const [newAddressDefaultValues, setNewAddressDefaultValues] =
    useState<IFormAddress | null>(null);
  const [tempSelectedAddress, setTempSelectedAddress] =
    useState<IAddress | null>(null);

  const navigate = useNavigate();

  const { user } = useUserContext();
  const {
    getAddresses,
    selectedAddress,
    incompleteAddress,
    changeSelectedAddressById,
    clearSelectedAddress,
    userAddresses,
    getFromLocalStorage,
  } = useAddressContext();

  const handleNewAddress = () => {
    if (!user) {
      navigate("/login");
      closeModal();
      return;
    }
    setNewAddressDefaultValues(formAddress);
    setIsAddressModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tempSelectedAddress) {
      changeSelectedAddressById(tempSelectedAddress.id);
      localStorage.removeItem("postalCode");
      localStorage.setItem("addressId", tempSelectedAddress.id.toString());
    }
    getFromLocalStorage();
    closeModal();
  };

  const handleUseIncompletePostal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    clearSelectedAddress();
    localStorage.removeItem("addressId");
    localStorage.setItem(
      "postalCode",
      sanitizePostalCode(formAddress.postalCode)
    );
    getFromLocalStorage();
    closeModal();
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
    setTempSelectedAddress(
      userAddresses.find(
        (address) => address.id === parseInt(e.target.value)
      ) || null
    );
  };

  const handleUpdateAddresses = () => {
    if (!user) return;
    getAddresses(user.id);
  };

  useEffect(() => {
    if (!incompleteAddress?.postalCode) return;

    setFormAddress(incompleteAddress);
  }, [incompleteAddress]);

  useEffect(() => {
    setTempSelectedAddress(selectedAddress);
  }, [selectedAddress]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      style={{
        width: "35rem",
        paddingBlock: "2rem",
        paddingInline: "3rem",
        gap: "2.5rem",
      }}
    >
      <Modal.Title>Escolha um endereço</Modal.Title>
      <AddressList
        selectedAddressId={tempSelectedAddress?.id || 0}
        onChange={handleChange}
        onUpdate={handleUpdate}
      />
      <Form onSubmit={handleSave} style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "start",
          }}
        >
          <Typography fontWeight={"bold"}>Outro lugar</Typography>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <PostalCodeInput
              postalCode={formatPostalCode(formAddress.postalCode)}
              setAddress={setFormAddress}
            />
            <Button
              onClick={(e) => handleUseIncompletePostal(e)}
              variant="outlined"
              disabled={!formAddress.state}
              sx={{
                height: "fit-content",
              }}
            >
              Usar
            </Button>
          </Box>
          {formAddress.street && (
            <Box>
              <Typography>
                {formAddress.street} - {formAddress.neighbourhood}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {formAddress.city}, {formAddress.state} -{" "}
                {formatPostalCode(formAddress.postalCode)}
              </Typography>
            </Box>
          )}
          <Form.Action onClick={handleNewAddress}>
            Adicionar endereço completo
          </Form.Action>
        </Box>
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

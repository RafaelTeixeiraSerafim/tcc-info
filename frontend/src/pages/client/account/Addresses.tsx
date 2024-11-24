import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressList from "../../../components/AddressList";
import AddressModal from "../../../components/AddressModal";
import { useAddressContext, useUserContext } from "../../../hooks";
import { IAddress } from "../../../interfaces";

export default function Addresses() {
  const [addressToUpdate, setAddressToUpdate] = useState<IAddress | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [tempSelectedAddress, setTempSelectedAddress] =
    useState<IAddress | null>(null);

  const { user } = useUserContext();
  const {
    getAddresses,
    selectedAddress,
    changeSelectedAddressById,
    userAddresses,
    getFromLocalStorage,
  } = useAddressContext();

  const handleNewAddress = () => {
    setIsAddressModalOpen(true);
  };

  const handleSave = () => {
    if (tempSelectedAddress) {
      changeSelectedAddressById(tempSelectedAddress.id);
      localStorage.removeItem("postalCode");
      localStorage.setItem(
        "addressId",
        tempSelectedAddress.id.toString()
      );
    }
    getFromLocalStorage();
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
    setTempSelectedAddress(selectedAddress);
  }, [selectedAddress]);

  return (
    <>
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            padding: "2rem",
            alignItems: "start"
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ color: "text.primary" }}>Meus Endereços</Typography>
          </Breadcrumbs>
          <AddressList
            selectedAddressId={tempSelectedAddress?.id || 0}
            onChange={handleChange}
            onUpdate={handleUpdate}
          />
          <Button onClick={handleNewAddress} variant="outlined">
            Adicionar endereço
          </Button>
          <Button onClick={handleSave} variant="contained" sx={{alignSelf: "center"}}>Salvar</Button>
          <AddressModal
            isOpen={isAddressModalOpen}
            onClose={handleClose}
            onUpdateAddresses={handleUpdateAddresses}
            addressToUpdate={addressToUpdate ? addressToUpdate : undefined}
          />
        </Box>
      )}
    </>
  );
}

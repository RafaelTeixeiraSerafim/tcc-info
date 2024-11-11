import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressList from "../../components/AddressList";
import AddressModal from "../../components/AddressModal";
import CartSubtotal from "../../components/CartSubtotal";
import { useUserContext } from "../../hooks";
import useAddressContext from "../../hooks/useAddressContext";
import { IAddress } from "../../interfaces";

export default function AddressOptions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToUpdate, setAddressToUpdate] = useState<IAddress | null>(null);

  const { user } = useUserContext();
  const { selectedAddress, getAddresses, changeSelectedAddressById } =
    useAddressContext();

  const navigate = useNavigate();

  const handleClose = (
    isUpdating: boolean,
    hasUpdateValues: boolean,
    clearAddress: () => void
  ) => {
    if (isUpdating) {
      setAddressToUpdate?.(null);
      clearAddress();
    }
    setIsModalOpen(false);
  };

  const handleUpdate = (addressToUpdate: IAddress) => {
    setAddressToUpdate(addressToUpdate);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSelectedAddressById(parseInt(e.target.value));
  };

  const handleUpdateAddresses = () => {
    if (!user) return;
    getAddresses(user.id);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          mb: "3rem",
          width: "80%",
          marginInline: "auto",
        }}
      >
        <Typography component="h1" variant="h4">
          Escolha seu endereço de entrega
        </Typography>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2rem",
            minHeight: "60vh",
            gap: "2rem",
          }}
        >
          <AddressList
            selectedAddressId={selectedAddress?.id || 0}
            onChange={handleChange}
            onUpdate={handleUpdate}
          />
          <Button
            variant="outlined"
            onClick={() => setIsModalOpen(true)}
            sx={{ width: "fit-content" }}
          >
            Adicionar endereço
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}
          >
            <CartSubtotal fontSize={"1.125rem"} />
            <Button
              variant="contained"
              onClick={() => navigate("/checkout/shipping-options")}
              disabled={!selectedAddress}
            >
              Continuar
            </Button>
          </Box>
        </Paper>
      </Box>
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onUpdateAddresses={handleUpdateAddresses}
        addressToUpdate={addressToUpdate ? addressToUpdate : undefined}
      />
    </>
  );
}

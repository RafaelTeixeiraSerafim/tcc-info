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
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          mb: "3rem",
          width: "60%",
          minHeight: "60vh",
          marginInline: "auto",
          paddingBlock: "2.5rem",
          paddingInline: "2rem",
        }}
      >
        <Box>
          <Typography component="h1" variant="h3">
            Escolha seu endereço de entrega
          </Typography>
          <hr style={{ width: "100%" }} color="#d3d3d3" />
        </Box>
        <AddressList
          selectedAddressId={selectedAddress?.id || 0}
          onChange={handleChange}
          onUpdate={handleUpdate}
        />
        <Box>
          <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
            Adicionar endereço
          </Button>
        </Box>
        <Box>
          <CartSubtotal />
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate("/checkout/shipping-options")}
          disabled={!selectedAddress}
        >
          Continuar
        </Button>
      </Paper>
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onUpdateAddresses={handleUpdateAddresses}
        addressToUpdate={addressToUpdate ? addressToUpdate : undefined}
      />
    </>
  );
}

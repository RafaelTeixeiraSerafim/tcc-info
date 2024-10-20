import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddressList from "../../components/AddressList";
import AddressModal from "../../components/AddressModal";
import CartShippingFee from "../../components/CartShippingFee";
import CartSubtotal from "../../components/CartSubtotal";
import CartTotal from "../../components/CartTotal";
import { useUserContext } from "../../hooks";
import useAddressContext from "../../hooks/useAddressContext";
import { IAddress } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export default function AddressOptions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToUpdate, setAddressToUpdate] = useState<IAddress | null>(null);

  const { user } = useUserContext();
  const { selectedAddress, getAddresses, setSelectedAddressById } =
    useAddressContext();

  const navigate = useNavigate()

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
    setSelectedAddressById(parseInt(e.target.value));
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
          gap: "1.5rem",
          mt: "7rem",
          mb: "3rem",
          width: "60%",
          minHeight: "60vh",
          marginInline: "auto",
          padding: "1rem",
        }}
      >
        <Typography>Escolha seu endereço de entrega</Typography>
        <AddressList
          selectedAddressId={selectedAddress?.id || 0}
          onChange={handleChange}
          onUpdate={handleUpdate}
        />
        <CartSubtotal />
        <CartShippingFee />
        <CartTotal />
        <Box>
          <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
            Adicionar endereço
          </Button>
          <Button variant="contained" onClick={() => navigate("/checkout/shipping-options")}>Continuar</Button>
        </Box>
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

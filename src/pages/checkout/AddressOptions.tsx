import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IAddress, IOrder } from "../../interfaces";
import axiosInstance from "../../config/axiosInstance";
import AddressModal from "../../components/AddressModal";
import AddressList from "../../components/AddressList";
import { useUserContext } from "../../hooks";
import useAddressContext from "../../hooks/useAddressContext";

export default function AddressOptions() {
  const orderState = useLocation().state;

  const [order, setOrder] = useState<IOrder | null>(orderState || null);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToUpdate, setAddressToUpdate] = useState<IAddress | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState(0);

  const { user } = useUserContext();
  const { selectedAddress } = useAddressContext();

  const getOrder = () => {
    if (!user) return;

    axiosInstance
      .get(`/api/v1/orders/user/${user.id}`)
      .then((response) => {
        console.log(response);
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  const handleClose = (
    isUpdating: boolean,
    hasDefaultValues: boolean,
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddressId(parseInt(e.target.value));
  };

  useEffect(() => {
    getOrder();
    getAddresses();
  }, [user?.id]);

  useEffect(() => {
    if (!selectedAddress) return;

    setSelectedAddressId(selectedAddress.id);
  }, [selectedAddress?.id]);

  return (
    <>
      {order && (
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
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onChange={handleChange}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
          <Box>
            <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
              Adicionar endereço
            </Button>
            <Button variant="contained">Continuar</Button>
          </Box>
        </Box>
      )}
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onUpdateAddresses={getAddresses}
        addressToUpdate={addressToUpdate ? addressToUpdate : undefined}
      />
    </>
  );
}

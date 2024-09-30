import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IAddress, IOrder } from "../../interfaces";
import UserContext from "../../contexts/UserContext";
import axiosInstance from "../../config/axiosInstance";
import AddressModal from "../../components/AddressModal";
import AddressList from "../../components/AddressList";

export default function AddressOptions() {
  const orderState = useLocation().state;

  const [order, setOrder] = useState<IOrder | null>(orderState || null);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToUpdate, setAddressToUpdate] = useState<IAddress | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState(0);

  const { user } = useContext(UserContext);

  const getOrder = () => {
    if (!user) return;

    axiosInstance
      .get(`api/v1/orders/user/${user.id}`)
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
        "api/v1/addresses?userId=" + user.id
      );
      console.log(response);
      setAddresses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrder();
    getAddresses();
  }, [user?.id]);

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
            setAddresses={setAddresses}
            setAddressToUpdate={setAddressToUpdate}
            setIsModalOpen={setIsModalOpen}
            selectedAddressId={selectedAddressId}
            setSelectedAddressId={setSelectedAddressId}
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
        setIsOpen={setIsModalOpen}
        onUpdateAddresses={getAddresses}
        addressToUpdate={addressToUpdate ? addressToUpdate : undefined}
        setAddressToUpdate={setAddressToUpdate}
      />
    </>
  );
}

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import axiosInstance from "../config/axiosInstance";
import { IAddress } from "../interfaces";

interface AddressListProps {
  addresses: IAddress[];
  setAddresses: React.Dispatch<React.SetStateAction<IAddress[]>>;
  setAddressToUpdate: React.Dispatch<React.SetStateAction<IAddress | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAddressId: number;
  setSelectedAddressId: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddressList({
  addresses,
  setAddresses,
  setAddressToUpdate,
  setIsModalOpen,
  selectedAddressId,
  setSelectedAddressId,
}: AddressListProps) {
  const handleDelete = async (addressId: number) => {
    try {
      const response = await axiosInstance.delete(
        `api/v1/addresses/${addressId}`
      );
      console.log(response);
      setAddresses(addresses.filter((address) => address.id !== addressId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (addressToUpdate: IAddress) => {
    setAddressToUpdate(addressToUpdate);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddressId(parseInt(e.target.value))
  }

  return (
    <>
      {addresses.map((address) => (
        <Box>
          <input type="radio" name="address" key={address.id} value={address.id} onChange={handleChange} checked={selectedAddressId === address.id}/>
          <Typography>{address.fullName}</Typography>
          <Typography>{address.city}</Typography>
          <Button onClick={() => handleDelete(address.id)}>Excluir</Button>
          <Button onClick={() => handleUpdate(address)}>Alterar</Button>
        </Box>
      ))}
    </>
  );
}

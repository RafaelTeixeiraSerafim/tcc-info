import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { IAddress } from "../interfaces";

interface AddressListProps {
  addresses: IAddress[];
  onDelete: (addressId: number) => void;
  onUpdate: (addressToUpdate: IAddress) => void;
  selectedAddressId: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddressList({
  addresses,
  selectedAddressId,
  onChange,
  onUpdate,
  onDelete,
}: AddressListProps) {
  return (
    <>
      {addresses.map((address) => (
        <Box>
          <input
            type="radio"
            name="address"
            key={address.id}
            value={address.id}
            onChange={onChange}
            checked={selectedAddressId === address.id}
          />
          <Typography>{address.fullName}</Typography>
          <Typography>{address.city}</Typography>
          <Button onClick={() => onDelete(address.id)}>Excluir</Button>
          <Button onClick={() => onUpdate(address)}>Alterar</Button>
        </Box>
      ))}
    </>
  );
}

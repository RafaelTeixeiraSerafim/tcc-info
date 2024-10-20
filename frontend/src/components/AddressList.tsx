import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { IAddress } from "../interfaces";
import { useAddressContext } from "../hooks";

interface AddressListProps {
  onUpdate: (addressToUpdate: IAddress) => void;
  selectedAddressId: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddressList({
  selectedAddressId,
  onChange,
  onUpdate,
}: AddressListProps) {
  const { userAddresses, handleDelete } = useAddressContext();

  return (
    <>
      {userAddresses.map((address) => (
        <Box key={address.id}>
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
          <Button onClick={() => handleDelete(address.id)}>Excluir</Button>
          <Button onClick={() => onUpdate(address)}>Alterar</Button>
        </Box>
      ))}
    </>
  );
}

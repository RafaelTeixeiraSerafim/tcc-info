import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAddressContext } from "../hooks";
import { IAddress } from "../interfaces";

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
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            width: "100%"
          }}
          key={address.id}
        >
          <input
            type="radio"
            name="address"
            key={address.id}
            value={address.id}
            onChange={onChange}
            checked={selectedAddressId === address.id}
          />
          <Box>
            <Typography>
              {address.street}, {address.houseNumber} - {address.neighbourhood}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {address.city}, {address.state} - {address.postalCode}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {address.fullName}
            </Typography>
            <Button
              color="error"
              size="small"
              onClick={() => handleDelete(address.id)}
            >
              Excluir
            </Button>
            <Button
              color="warning"
              size="small"
              onClick={() => onUpdate(address)}
            >
              Alterar
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
}

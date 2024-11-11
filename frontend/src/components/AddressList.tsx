import { Box, Button, Stack, Typography } from "@mui/material";
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
            width: "100%",
            paddingBottom: "1.5rem",
            borderBottom: "solid 1px #c3c3c3",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <Typography>
                {address.street}, {address.houseNumber} -{" "}
                {address.neighbourhood}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {address.city}, {address.state} - {address.postalCode}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {address.fullName}
              </Typography>
            </Box>
            <Stack>
              <Button color="warning" onClick={() => onUpdate(address)}>
                Alterar
              </Button>
              <Button color="error" onClick={() => handleDelete(address.id)}>
                Excluir
              </Button>
            </Stack>
          </Box>
        </Box>
      ))}
    </>
  );
}

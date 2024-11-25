import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useAddressContext } from "../hooks";
import { IAddress } from "../interfaces";
import { formatPhone, formatPostalCode } from "../utils/helpers";
import DeleteAddressButton from "./DeleteAddressButton";

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
  const { userAddresses } = useAddressContext();
  const theme = useTheme();

  return (
    <>
      {userAddresses.length === 0 && (
        <Typography>
          Parece que você não possui nenhum endereço cadastrado...
        </Typography>
      )}
      {userAddresses.map((address) => (
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            paddingBottom: "1.5rem",
            borderBottom: "solid 1px " + theme.palette.divider,
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
                {address.city}, {address.state} -{" "}
                {formatPostalCode(address.postalCode)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {address.fullName} - {formatPhone(address.contactPhone)}
              </Typography>
            </Box>
            <Stack>
              <Button color="warning" onClick={() => onUpdate(address)}>
                Alterar
              </Button>
              <DeleteAddressButton addressId={address.id} />
            </Stack>
          </Box>
        </Box>
      ))}
    </>
  );
}

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Box, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAddressContext, useUserContext } from "../../hooks";
import { createPreference } from "../../service/api";

export default function ReviewOrder() {
  const [preferenceId, setPreferenceId] = useState("");
  const { selectedAddress, selectedShippingOption } = useAddressContext();
  const { user } = useUserContext();

  const handleCheckout = async (userId: number, selectedAddressId: number, shippingFee: number) => {
    try {
      const id = await createPreference(userId, selectedAddressId, shippingFee);
      setPreferenceId(id);
    } catch (error) {
      alert(`Erro ao finalizar sua compra: ${(error as AxiosError).message}`);
    }
  };

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    if (!user || !selectedAddress || !selectedShippingOption) return;

    handleCheckout(user.id, selectedAddress.id, parseFloat(selectedShippingOption.price));
  }, [user, selectedAddress, selectedShippingOption]);

  return (
    <Box>
      {preferenceId.length > 0 && (
        <>
          <Typography variant="h1">Review Order</Typography>
          <Wallet
            initialization={{ preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        </>
      )}
    </Box>
  );
}

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAddressContext, useUserContext } from "../../hooks";
import { createPreference } from "../../service/api";
import { formatCurrency } from "../../utils/helpers";
import CartSubtotal from "../../components/CartSubtotal";
import CartShippingFee from "../../components/CartShippingFee";
import CartTotal from "../../components/CartTotal";
import { Link } from "react-router-dom";

export default function ReviewOrder() {
  const [preferenceId, setPreferenceId] = useState("");
  const { selectedAddress, selectedShippingOption } = useAddressContext();
  const { user } = useUserContext();
  const theme = useTheme();

  const handleCheckout = async (
    userId: number,
    selectedAddressId: number,
    shippingFee: number,
    deliveryMinDays: number,
    deliveryMaxDays: number
  ) => {
    try {
      const id = await createPreference(
        userId,
        selectedAddressId,
        shippingFee,
        deliveryMinDays,
        deliveryMaxDays
      );
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

    handleCheckout(
      user.id,
      selectedAddress.id,
      parseFloat(selectedShippingOption.price),
      selectedShippingOption.deliveryMinDays,
      selectedShippingOption.deliveryMaxDays
    );
  }, [user, selectedAddress, selectedShippingOption]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        my: "3rem",
        width: "80%",
        marginInline: "auto",
      }}
    >
      <Typography component="h1" variant="h4">
        Revise seu pedido
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          mb: "3rem",
          minHeight: "60vh",
          padding: "2rem",
        }}
      >
        {preferenceId.length > 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <Typography variant="h5">Endereço de entrega</Typography>
              <Box>
                <Typography>
                  {selectedAddress?.street}, {selectedAddress?.houseNumber} -{" "}
                  {selectedAddress?.neighbourhood}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {selectedAddress?.city}, {selectedAddress?.state} -{" "}
                  {selectedAddress?.postalCode}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {selectedAddress?.fullName}
                </Typography>
              </Box>
              <Link
                to={"/checkout/address-options"}
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  width: "fit-content",
                  fontSize: "0.875rem"
                }}
              >
                Editar
              </Link>
            </Box>
            <hr
              style={{
                width: "100%",
                height: "1px",
                border: "none",
                backgroundColor: theme.palette.divider,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <Typography variant="h5">Forma de entrega</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box>
                  <Typography>{selectedShippingOption?.name}</Typography>
                  <Typography>
                    Chegará entre {selectedShippingOption?.deliveryMinDays} e{" "}
                    {selectedShippingOption?.deliveryMaxDays} dias
                  </Typography>
                </Box>
                <Typography>
                  {formatCurrency(
                    parseFloat(selectedShippingOption?.price || "")
                  )}
                </Typography>
              </Box>
              <Link
                to={"/checkout/shipping-options"}
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  width: "fit-content",
                  fontSize: "0.875rem"
                }}
              >
                Editar
              </Link>
            </Box>
            <hr
              style={{
                width: "100%",
                height: "1px",
                border: "none",
                backgroundColor: theme.palette.divider,
              }}
            />
            <Box>
              <CartSubtotal />
              <CartShippingFee />
              <CartTotal />
              <Wallet
                initialization={{ preferenceId }}
                customization={{
                  texts: { valueProp: "smart_option" },
                }}
                locale="pt-BR"
              />
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}

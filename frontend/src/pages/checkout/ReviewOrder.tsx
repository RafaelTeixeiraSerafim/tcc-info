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
    shippingFee: number
  ) => {
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

    handleCheckout(
      user.id,
      selectedAddress.id,
      parseFloat(selectedShippingOption.price)
    );
  }, [user, selectedAddress, selectedShippingOption]);

  return (
    <>
      {preferenceId.length > 0 && (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            mb: "3rem",
            width: "60%",
            minHeight: "60vh",
            marginInline: "auto",
            paddingBlock: "2.5rem",
            paddingInline: "2rem",
          }}
        >
          <Box>
            <Typography component="h1" variant="h3">
              Revisar Pedido
            </Typography>
            <hr style={{ width: "100%" }} color="#d3d3d3" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1.75rem",
            }}
          >
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
                }}
              >
                Editar
              </Link>
            </Box>
            <hr style={{ width: "100%" }} color="#d3d3d3" />
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
                    Chegará em até {selectedShippingOption?.deliveryTime} dias
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
                }}
              >
                Editar
              </Link>
            </Box>
            <hr style={{ width: "100%" }} color="#d3d3d3" />
            <Box>
              <CartSubtotal />
              <CartShippingFee />
              <CartTotal />
            </Box>
          </Box>
          <Wallet
            initialization={{ preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
            locale="pt-BR"
          />
        </Paper>
      )}
    </>
  );
}

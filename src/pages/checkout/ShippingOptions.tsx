import { Box, Button, Typography } from "@mui/material";
import CartShippingFee from "../../components/CartShippingFee";
import CartSubtotal from "../../components/CartSubtotal";
import CartTotal from "../../components/CartTotal";
import { useCartContext } from "../../hooks";
import { formatCurrency } from "../../utils/helpers";
// import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// initMercadoPago("YOUR_PUBLIC_KEY");

export default function ShippingOptions() {
  const { shippingOptions, selectedShippingOption, setSelectedShippingOption } =
    useCartContext();

  return (
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
      <Typography>Escolha sua forma de entrega</Typography>
      {shippingOptions.map((option) => (
        <Box key={option.id}>
          <input
            type="radio"
            name="shippingOption"
            key={option.id}
            value={option.id}
            onChange={() => setSelectedShippingOption(option)}
            checked={selectedShippingOption?.id === option.id}
          />
          <Typography>{option.name}</Typography>
          <Typography>{formatCurrency(parseFloat(option.price))}</Typography>
          <Typography>{option.deliveryTime}</Typography>
        </Box>
      ))}
      <CartSubtotal />
      <CartShippingFee />
      <CartTotal />
      <Button variant="contained">Continuar</Button>

      {/* <Wallet
        initialization={{ preferenceId: "<PREFERENCE_ID>" }}
        customization={{ texts: { valueProp: "smart_option" } }}
      /> */}
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import CartShippingFee from "../../components/CartShippingFee";
import CartSubtotal from "../../components/CartSubtotal";
import CartTotal from "../../components/CartTotal";
import { useAddressContext, useCartContext } from "../../hooks";
import { formatCurrency } from "../../utils/helpers";
import CheckoutButton from "../../components/CheckoutButton";

export default function ShippingOptions() {
  const { shippingOptions } =
    useCartContext();
  const {selectedShippingOption, changeSelectedShippingOption} = useAddressContext()

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
            onChange={() => changeSelectedShippingOption(option)}
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
      <CheckoutButton/>
    </Box>
  );
}

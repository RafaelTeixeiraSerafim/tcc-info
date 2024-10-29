import { Box, Paper, Typography } from "@mui/material";
import CartShippingFee from "../../components/CartShippingFee";
import CartSubtotal from "../../components/CartSubtotal";
import CartTotal from "../../components/CartTotal";
import { useAddressContext, useCartContext } from "../../hooks";
import { formatCurrency } from "../../utils/helpers";
import CheckoutButton from "../../components/CheckoutButton";

export default function ShippingOptions() {
  const { shippingOptions } = useCartContext();
  const { selectedShippingOption, changeSelectedShippingOption } =
    useAddressContext();

  return (
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
          Escolha sua forma de entrega
        </Typography>
        <hr style={{ width: "100%" }} color="#d3d3d3" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {shippingOptions.map((option) => (
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
            key={option.id}
          >
            <input
              type="radio"
              name="shippingOption"
              key={option.id}
              value={option.id}
              onChange={() => changeSelectedShippingOption(option)}
              checked={selectedShippingOption?.id === option.id}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <Typography fontWeight={"bold"}>{option.name}</Typography>
                <Typography>
                  Chegará em até {option.deliveryTime} dias
                </Typography>
              </Box>
              <Typography fontWeight={"bold"}>
                {formatCurrency(parseFloat(option.price))}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box>
        <CartSubtotal />
        <CartShippingFee />
        <CartTotal />
      </Box>
      <CheckoutButton />
    </Paper>
  );
}

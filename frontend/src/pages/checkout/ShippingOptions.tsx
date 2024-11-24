import { Box, Paper, Typography, useTheme } from "@mui/material";
import CartShippingFee from "../../components/CartShippingFee";
import CartSubtotal from "../../components/CartSubtotal";
import CartTotal from "../../components/CartTotal";
import { useAddressContext, useCartContext } from "../../hooks";
import CheckoutButton from "../../components/CheckoutButton";
import ShippingOption from "../../components/ShippingOption";

export default function ShippingOptions() {
  const { shippingOptions } = useCartContext();
  const { selectedShippingOption, changeSelectedShippingOption } =
    useAddressContext();
  const theme = useTheme()

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
        Escolha sua forma de entrega
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2rem",
          minHeight: "60vh",
          gap: "2rem",
        }}
      >
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
                paddingBottom: "1.5rem",
                borderBottom: "solid 1px " + theme.palette.divider,
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
              <ShippingOption optionData={option}/>
            </Box>
          ))}
        </Box>
        <Box>
          <CartSubtotal fontSize={"1.125rem"} />
          <CartShippingFee fontSize={"1.125rem"} />
          <CartTotal fontSize={"1.125rem"} fontWeight={"bold"} />
        </Box>
        <CheckoutButton />
      </Paper>
    </Box>
  );
}

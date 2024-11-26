import { Box, Paper, Stack, Typography } from "@mui/material";
import CartCard from "../../components/CartCard";
import CartShippingFee from "../../components/CartShippingFee";
import CartSubtotal from "../../components/CartSubtotal";
import CartTotal from "../../components/CartTotal";
import ContinueOrderButton from "../../components/ContinueOrderButton";
import { useCartContext } from "../../hooks";
import EmptyCartImg from "../../assets/images/empty_cart.png";

export default function Cart() {
  const { cartItems } = useCartContext();

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
      <Typography component={"h1"} variant="h4">
        Meu Carrinho
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "1rem",
          minHeight: "60vh",
        }}
      >
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((cartItem) => (
              <CartCard cartItem={cartItem} key={cartItem.id} />
            ))}
            <Box>
              <CartSubtotal fontSize={"1.125rem"} />
              <CartShippingFee fontSize={"1.125rem"} />
              <CartTotal fontSize={"1.125rem"} />
            </Box>
            <ContinueOrderButton />
          </>
        ) : (
          <Stack
            direction={"row"}
            width={"100%"}
            gap={"3rem"}
            justifyContent={"center"}
          >
            <Typography
              variant="h6"
              alignSelf={"center"}
              color="text.secondary"
            >
              Parece que seu carrinho está vazio...
            </Typography>
            <img src={EmptyCartImg} alt="" width={"35%"} />
          </Stack>
        )}
      </Paper>
    </Box>
  );
}

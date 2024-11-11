import { Box, Paper, Typography } from "@mui/material";
import CartCard from "../../components/CartCard";
import CartShippingFee from "../../components/CartShippingFee";
import CartSubtotal from "../../components/CartSubtotal";
import CartTotal from "../../components/CartTotal";
import ContinueOrderButton from "../../components/ContinueOrderButton";
import { useCartContext } from "../../hooks";

export default function Cart() {
  const { cartItems } = useCartContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        mb: "3rem",
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
          padding: "2rem",
          minHeight: "60vh"
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
          <Typography>Carrinho vazio</Typography>
        )}
      </Paper>
    </Box>
  );
}

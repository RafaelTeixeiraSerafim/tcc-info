import { Box, Paper, Typography } from "@mui/material";
import CartCard from "../components/CartCard";
import CartShippingFee from "../components/CartShippingFee";
import CartSubtotal from "../components/CartSubtotal";
import CartTotal from "../components/CartTotal";
import ContinueOrderButton from "../components/ContinueOrderButton";
import { useCartContext } from "../hooks";

export default function Cart() {
  const { cartItems } = useCartContext();

  // const handlePurchase = async () => {
  //   if (!user) return;

  //   try {
  //     await placeOrder(user.id);
  //     alert("Compra finalizada com sucesso!");
  //   } catch (error) {
  //     alert(`Erro finalizando a compra: ${(error as AxiosError).message}`);
  //   }
  // };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        mb: "3rem",
        width: "60%",
        minHeight: "60vh",
        marginInline: "auto",
        padding: "1rem",
      }}
    >
      <Typography variant="h4">Meu Carrinho</Typography>
      {cartItems.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {cartItems.map((cartItem) => (
            <CartCard cartItem={cartItem} key={cartItem.id} />
          ))}
          <Box>
            <CartSubtotal variant="h6" />
            <CartShippingFee variant="h6" />
            <CartTotal variant="h5" />
          </Box>
          <ContinueOrderButton />
        </Box>
      ) : (
        <Typography>Carrinho vazio</Typography>
      )}
    </Paper>
  );
}

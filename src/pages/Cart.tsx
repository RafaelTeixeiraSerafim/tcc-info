import { Box, Button, Paper, Typography } from "@mui/material";
import { AxiosError } from "axios";
import CartCard from "../components/CartCard";
import CartShippingFee from "../components/CartShippingFee";
import CartSubtotal from "../components/CartSubtotal";
import CartTotal from "../components/CartTotal";
import ContinueOrderButton from "../components/ContinueOrderButton";
import { useCartContext, useUserContext } from "../hooks";
import { placeOrder } from "../service/api";

export default function Cart() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserContext();
  const { cartItems } = useCartContext();

  const handlePurchase = async () => {
    if (!user) return;

    try {
      await placeOrder(user.id);
      alert("Compra finalizada com sucesso!");
    } catch (error) {
      alert(`Erro finalizando a compra: ${(error as AxiosError).message}`);
    }
  };

  return (
    <Paper
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
            <Box>
              <CartShippingFee variant="h6" />
              {/* <Button onClick={() => setIsModalOpen(true)}>
                Mudar forma de entrega
              </Button> */}
            </Box>
            <CartTotal variant="h5" />
          </Box>
          <ContinueOrderButton />
          <Button onClick={() => handlePurchase()}>Finalizar Compra</Button>
        </Box>
      ) : (
        <Typography>Carrinho vazio</Typography>
      )}
      {/* <ShippingOptionModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      /> */}
    </Paper>
  );
}

import { Box, Paper, Typography } from "@mui/material";
import { useCartContext } from "../../hooks";
import CartSubtotal from "../CartSubtotal";
import AddedToCartItemCard from "./AddedToCartItemCard";
import GoToCartButton from "./GoToCartButton";

export default function AddedToCartPopup() {
  const { cartItems, handleDeleteFromCart } = useCartContext();

  return (
    <Paper
      elevation={5}
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "23rem",
        padding: "1rem",
        left: "50%",
        transform: "translate(-70%, 0)",
      }}
    >
      <Typography variant="h6" component={"h1"}>
        MEU CARRINHO
      </Typography>
      {cartItems.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {cartItems.map((cartItem) => (
            <AddedToCartItemCard
              cartItem={cartItem}
              onDelete={handleDeleteFromCart}
              key={cartItem.id}
            />
          ))}
          <CartSubtotal />
          <GoToCartButton />
        </Box>
      ) : (
        <Typography>Carrinho vazio</Typography>
      )}
    </Paper>
  );
}

import { Box } from "@mui/material";
import useCartContext from "../../hooks/useCartContext";

export default function AddedToCartBackdrop() {
  const { addedToCart, setAddedToCart } = useCartContext();

  return (
    <>
      {addedToCart && (
        <Box
          component={"div"}
          sx={{
            position: "fixed",
            bgcolor: "#000",
            opacity: 0.5,
            left: -5,
            right: -5,
            top: -5,
            bottom: -5,
          }}
          onClick={() => setAddedToCart(false)}
        />
      )}
    </>
  );
}

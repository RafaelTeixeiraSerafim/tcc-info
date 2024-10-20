import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../hooks";

interface AddToCartButtonProps {
  productId: number;
  productQty: number;
}

export default function AddToCartButton({ productId, productQty }: AddToCartButtonProps) {
  const { handleAddToCart } = useCartContext();
  const navigate = useNavigate();

  const handleAddToCartWrapper = async (
    productId: number,
    productQty: number
  ) => {
    try {
      await handleAddToCart(productId, productQty);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  return (
    <Button
      variant="contained"
      onClick={() =>
        handleAddToCartWrapper(productId, productQty)
      }
      sx={{
        display: "inline",
      }}
    >
      Comprar
    </Button>
  );
}

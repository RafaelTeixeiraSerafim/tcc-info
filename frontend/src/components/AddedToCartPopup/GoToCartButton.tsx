import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCartContext from "../../hooks/useCartContext";

export default function GoToCartButton() {
  const { setAddedToCart } = useCartContext();
  const navigate = useNavigate();

  const handleGoToCart = () => {
    setAddedToCart(false);
    navigate("/cart");
  };

  return (
    <Button onClick={handleGoToCart} variant="contained">
      Ir para meu carrinho
    </Button>
  );
}

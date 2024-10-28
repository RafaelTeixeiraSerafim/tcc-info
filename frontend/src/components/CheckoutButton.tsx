import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CheckoutButton() {
  const navigate = useNavigate()

  return (
    <>
      <Button variant="contained" onClick={() => navigate("/checkout/review")}>
        Continuar
      </Button>
    </>
  );
}

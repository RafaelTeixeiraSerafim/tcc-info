import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ContinueOrderButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => navigate(`/checkout/address-options`)}
    >
      Continuar Compra
    </Button>
  );
}

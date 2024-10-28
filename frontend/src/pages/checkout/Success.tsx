import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate()
  
  return (
    <Box>
      <Typography component={"h1"} variant="h2">Compra finalizada com successo!</Typography>
      <Button onClick={() => navigate("/")}>Voltar</Button>
    </Box>
  )
}

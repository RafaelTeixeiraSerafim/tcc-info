import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
        mb: "3rem",
        width: "60%",
        minHeight: "60vh",
        marginInline: "auto",
        paddingBlock: "2.5rem",
        paddingInline: "2rem",
      }}
    >
      <Typography component={"h1"} variant="h2">
        Compra finalizada com successo!
      </Typography>
      <Box flex={1}/>
      <Button variant="contained" onClick={() => navigate("/")}>Voltar às compras</Button>
    </Paper>
  );
}

import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPrompt() {
  const theme = useTheme();

  return (
    <Typography>
      Já possui uma conta?{" "}
      <Link
        to={"/login"}
        style={{
          textDecoration: "none",
          color: theme.palette.secondary.dark,
        }}
      >
        Entrar
      </Link>
    </Typography>
  );
}

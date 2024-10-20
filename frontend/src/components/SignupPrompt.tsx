import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export default function SignupPrompt() {
  const theme = useTheme();

  return (
    <Typography>
      Não possui uma conta?{" "}
      <Link
        to={"/signup"}
        style={{
          textDecoration: "none",
          color: theme.palette.secondary.dark,
        }}
      >
        Cadastre-se
      </Link>
    </Typography>
  );
}

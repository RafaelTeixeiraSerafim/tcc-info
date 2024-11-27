import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

interface SignupPromptProps {
  callback?: string;
}

export default function SignupPrompt({ callback }: SignupPromptProps) {
  const theme = useTheme();

  const to = `/signup` + (callback ? `?callback=${callback}` : "");

  return (
    <Typography>
      Não possui uma conta?{" "}
      <Link
        to={to}
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

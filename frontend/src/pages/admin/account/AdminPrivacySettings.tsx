import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteAdminAccountButton from "../../../components/DeleteAdminAccountButton";
import TitleUnderline from "../../../components/TitleUnderline";
import { useUserContext } from "../../../hooks";

export default function AdminPrivacySettings() {
  const { user } = useUserContext();

  return (
    <>
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            textAlign: "left",
            gap: "3rem",
          }}
        >
          <Typography variant="h4" component={"h1"}>
            Privacidade e Segurança
          </Typography>
          <Stack gap={"4rem"} width={"100%"}>
            <Box width="100%">
              <Box width="100%">
                <Typography variant="h6">Alterar Senha</Typography>
                <TitleUnderline />
              </Box>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={"password-change"}
              >
                Alterar senha
              </Button>
            </Box>
            <Box width={"100%"}>
              <Box width="100%">
                <Typography variant="h6">Deletar Conta</Typography>
                <TitleUnderline />
              </Box>
              <Stack gap={"1rem"} alignItems={"start"}>
                <Typography>
                  Deletar a sua conta{" "}
                  <strong>removerá todos os seus dados salvos</strong> e fará
                  com que você não consiga mais entrar nessa conta. <br />
                  <br />
                  Essa é uma ação <strong>irreversível</strong> e não poderá ser
                  desfeita.
                </Typography>
                <DeleteAdminAccountButton />
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
}

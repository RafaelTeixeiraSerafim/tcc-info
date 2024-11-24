import {
  Box,
  Breadcrumbs,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import TitleUnderline from "../../../components/TitleUnderline";
import axiosInstance from "../../../config/axiosInstance";
import { useUserContext } from "../../../hooks";

export default function PrivacySettings() {
  const { user, logoutUser } = useUserContext();
  const theme = useTheme();

  const disableAccount = async (userId: number) => {
    try {
      const response = await axiosInstance.patch(`/auth/${userId}/disable`);
      console.log(response);
      logoutUser();
    } catch (error) {
      console.log(error);
      alert(`Erro ao desativar conta: ${(error as AxiosError).message}`);
    }
  };

  const deleteAccount = async (userId: number) => {
    try {
      const response = await axiosInstance.delete(`/users/${userId}`);
      console.log(response);
      logoutUser();
    } catch (error) {
      console.log(error);
      alert(`Erro ao deletar conta: ${(error as AxiosError).message}`);
    }
  };

  return (
    <>
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            padding: "2rem",
            alignItems: "start",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Configurações</Typography>
            <Typography sx={{ color: "text.primary" }}>
              Privacidade e Segurança
            </Typography>
          </Breadcrumbs>
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
            <Box width="100%">
              <Box width="100%">
                <Typography variant="h6">Desativar Conta</Typography>
                <TitleUnderline />
              </Box>
              <Stack gap="1rem" alignItems={"start"}>
                <Typography>
                  Desativar a sua conta manterá todos os seus dados salvos, mas
                  fará com que você não possa mais entrar nessa conta. <br />
                  <br />
                  Para reativar sua conta, você terá que entrar em{" "}
                  <a
                    href="#footer"
                    style={{
                      textDecoration: "none",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    contato
                  </a>{" "}
                  conosco por telefone ou por email.
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => disableAccount(user.id)}
                >
                  Desativar minha conta
                </Button>
              </Stack>
            </Box>
            <Box width={"100%"}>
              <Box width="100%">
                <Typography variant="h6">Deletar Conta</Typography>
                <TitleUnderline />
              </Box>
              <Stack gap={"1rem"} alignItems={"start"}>
                <Typography>
                  Deletar a sua conta{" "}
                  <strong>
                    removerá todos os seus dados salvos, incluindo pedidos
                    pendentes
                  </strong>{" "}
                  e fará com que você não possa mais entrar nessa conta. <br />
                  <br />
                  Essa é uma ação <strong>irreversível</strong> e não poderá ser
                  desfeita.
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteAccount(user.id)}
                >
                  Deletar minha conta
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
}

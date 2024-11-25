import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useUserContext } from "../hooks";

export default function DeactivateAccountButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const theme = useTheme();

  const { user, logoutUser } = useUserContext();

  const handleClose = () => setIsDialogOpen(false);

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

  return (
    <>
      {user && (
        <>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsDialogOpen(true)}
          >
            Desativar minha conta
          </Button>
          <Dialog
            open={isDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Desativar conta?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
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
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  disableAccount(user.id);
                  handleClose();
                }}
                color="error"
              >
                Desativar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}

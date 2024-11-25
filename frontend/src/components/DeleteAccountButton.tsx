import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useUserContext } from "../hooks";

export default function DeleteAccountButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user, logoutUser } = useUserContext();

  const handleClose = () => setIsDialogOpen(false);

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
        <>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsDialogOpen(true)}
          >
            Deletar minha conta
          </Button>
          <Dialog
            open={isDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Deletar conta?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deletar a sua conta{" "}
                <strong>
                  removerá todos os seus dados salvos, incluindo pedidos
                  pendentes
                </strong>{" "}
                e fará com que você não possa mais entrar nessa conta. <br />
                <br />
                Essa é uma ação <strong>irreversível</strong> e não poderá ser
                desfeita.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  deleteAccount(user.id);
                  handleClose();
                }}
                color="error"
              >
                Deletar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}

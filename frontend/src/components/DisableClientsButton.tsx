import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { useState } from "react";
import axiosInstance from "../config/axiosInstance";

interface DisableClientsButtonProps {
  onUpdate: () => void;
  selectionModel: GridRowSelectionModel;
}

export default function DisableClientsButton({
  selectionModel,
  onUpdate,
}: DisableClientsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const disableClients = async (ids: number[]) => {
    try {
      const response = await axiosInstance.patch(`/auth/disable`, ids);
      console.log(response);
      onUpdate();
    } catch (error) {
      alert(`Erro ao desativar usuários: ${(error as AxiosError).message}`);
    }
  };

  const handleDisable = () => {
    disableClients(selectionModel as number[]);
    handleClose();
  };

  return (
    <>
      <Button
        color="error"
        onClick={() => setIsDialogOpen(true)}
        variant="outlined"
        disabled={selectionModel.length === 0}
      >
        Desativar clientes
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Desativar clientes?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Usuários desativados não podem entrar em suas contas, porém
            seus dados continuarão salvos no site.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
          <Button onClick={handleDisable} color={"error"}>
            Desativar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

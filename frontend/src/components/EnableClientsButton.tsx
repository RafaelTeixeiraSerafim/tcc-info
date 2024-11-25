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

interface EnableClientsButtonProps {
  onUpdate: () => void;
  selectionModel: GridRowSelectionModel;
}

export default function EnableClientsButton({
  selectionModel,
  onUpdate,
}: EnableClientsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const enableClients = async (ids: number[]) => {
    try {
      const response = await axiosInstance.patch(`/auth/enable`, ids);
      console.log(response);
      onUpdate();
    } catch (error) {
      alert(`Erro ao habilitar usuários: ${(error as AxiosError).message}`);
    }
  };

  const handleEnable = () => {
    enableClients(selectionModel as number[]);
    handleClose();
  };

  return (
    <>
      <Button
        color="success"
        onClick={() => setIsDialogOpen(true)}
        variant="outlined"
        disabled={selectionModel.length === 0}
      >
        Reativar clientes
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reativar clientes?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Usuários reativados poderão entrar em suas contas novamente com seus
            dados previamente salvos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
          <Button onClick={handleEnable} variant="outlined" color={"success"}>
            Reativar clientes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

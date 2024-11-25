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
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { IUser } from "../interfaces";

interface DeleteAdminButtonProps {
  onUpdate: () => void;
  selectionModel: GridRowSelectionModel;
  admins: IUser[];
}

export default function DeleteAdminButton({
  onUpdate,
  selectionModel,
  admins,
}: DeleteAdminButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const deleteAdmins = async (ids: number[]) => {
    try {
      if (ids.length === admins.length) return;

      const response = await axiosInstance.patch(`/auth/delete`, ids);
      console.log(response);
      onUpdate();
    } catch (error) {
      alert(`Erro ao deletar usuários: ${(error as AxiosError).message}`);
    }
  };

  const handleDelete = () => {
    deleteAdmins(selectionModel as number[]);
    handleClose();
  };

  return (
    <>
      <Button
        color="error"
        onClick={() => setIsDialogOpen(true)}
        variant="outlined"
        disabled={
          selectionModel.length === 0 || selectionModel.length === admins.length
        }
      >
        Deletar admins
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deletar administrador?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Todos os dados relacionados a essa conta serão apagados e não
            poderão ser recuperados. Essa é uma ação{" "}
            <strong>irreversível</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            color={"error"}
            // variant="outlined"
          >
            Deletar admins
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

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
import { deactivateCategories } from "../service/api";

interface DeactivateCategoriesButtonProps {
  onUpdate: () => void;
  selectionModel: GridRowSelectionModel;
}

export default function DeactivateCategoriesButton({
  selectionModel,
  onUpdate,
}: DeactivateCategoriesButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const deactivateSelectedCategories = async (categoryIds: number[]) => {
    try {
      await deactivateCategories(categoryIds);
      onUpdate();
    } catch (error) {
      alert(`Erro ao desativar categorias: ${(error as AxiosError).message}`);
    }
  };

  const handleDeactivate = () => {
    deactivateSelectedCategories(selectionModel as number[]);
    handleClose();
  };

  return (
    <>
      <Button
        color="warning"
        onClick={() => setIsDialogOpen(true)}
        variant="outlined"
        disabled={selectionModel.length === 0}
      >
        Desativar
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Desativar categorias?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Produtos desativados não aparecerão para os clientes, porém ainda
            podem ser recuperados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
          <Button onClick={handleDeactivate} color={"warning"}>
            Desativar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

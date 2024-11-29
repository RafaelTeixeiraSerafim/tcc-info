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
import { reactivateCategories } from "../service/api";

interface ReactivateCategoriesButtonProps {
  onUpdate: () => void;
  selectionModel: GridRowSelectionModel;
}

export default function ReactivateCategoriesButton({
  selectionModel,
  onUpdate,
}: ReactivateCategoriesButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const reactivateSelectedCategories = async (categoryIds: number[]) => {
    try {
      await reactivateCategories(categoryIds);
      onUpdate();
    } catch (error) {
      alert(`Erro ao reativar categorias: ${(error as AxiosError).message}`);
    }
  };

  const handleReactivate = () => {
    reactivateSelectedCategories(selectionModel as number[]);
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
        Reativar
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reativar categorias?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Produtos reativados voltarão a aparecer para os usuários.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
          <Button onClick={handleReactivate} color={"success"}>
            Reativar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

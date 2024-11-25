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
import { deleteCategories } from "../service/api";

interface DeleteCategoriesButtonProps {
  onUpdate: () => void;
  selectionModel: GridRowSelectionModel;
}

export default function DeleteCategoriesButton({
  selectionModel,
  onUpdate,
}: DeleteCategoriesButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const deleteSelectedCategories = async (ids: number[]) => {
    try {
      await deleteCategories(ids);

      onUpdate();
    } catch (error) {
      alert(`Erro ao deletar categorias: ${(error as AxiosError).message}`);
    }
  };

  const handleDelete = () => {
    deleteSelectedCategories(selectionModel as number[]);
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
        Deletar
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deletar categorias?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se uma categoria contém um produto que já foi comprado, ela será desativada e seus produtos
            serão deletados ou desativados de acordo.
            relacionadas a essa categoria também serão deletados e/ou desativados. Essa ação é{" "}
            <strong>irreversível</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color={"error"}>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

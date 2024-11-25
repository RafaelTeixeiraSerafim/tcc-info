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
import { deleteProducts } from "../service/api";

interface DeleteProductsButtonProps {
  onUpdate: () => void;
  selectionModel: GridRowSelectionModel;
}

export default function DeleteProductsButton({
  selectionModel,
  onUpdate,
}: DeleteProductsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const deleteSelectedProducts = async (productIds: number[]) => {
    try {
      await deleteProducts(productIds);
      onUpdate();
    } catch (error) {
      alert(`Erro ao deletar produtos: ${(error as AxiosError).message}`);
    }
  };

  const handleDelete = () => {
    deleteSelectedProducts(selectionModel as number[]);
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
        <DialogTitle id="alert-dialog-title">{"Deletar produtos?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Essa ação deletará todos os produtos selecionados que ainda não foram comprados e
            desativará os que já foram. Produtos deletados{" "}
            <strong>não poderão</strong> ser recuperados.
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

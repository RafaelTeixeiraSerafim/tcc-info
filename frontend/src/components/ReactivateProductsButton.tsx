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
import { reactivateProducts } from "../service/api";

interface ReactivateProductsButtonProps {
  onUpdate: () => void;
  selectionModel: GridRowSelectionModel;
}

export default function ReactivateProductsButton({
  selectionModel,
  onUpdate,
}: ReactivateProductsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const reactivateSelectedProducts = async (productIds: number[]) => {
    try {
      await reactivateProducts(productIds);
      onUpdate();
    } catch (error) {
      alert(`Erro ao reativar produtos: ${(error as AxiosError).message}`);
    }
  };

  const handleReactivate = () => {
    reactivateSelectedProducts(selectionModel as number[]);
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
          {"Reativar produtos?"}
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
          <Button onClick={handleReactivate} color={"success"} variant="outlined">
            Reativar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

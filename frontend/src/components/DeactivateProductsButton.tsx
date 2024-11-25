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
import { deactivateProducts } from "../service/api";

interface DeactivateProductsButtonProps {
  onUpdate: () => void;
  selectionModel: GridRowSelectionModel;
}

export default function DeactivateProductsButton({
  selectionModel,
  onUpdate,
}: DeactivateProductsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const deactivateSelectedProducts = async (productIds: number[]) => {
    try {
      await deactivateProducts(productIds);
      onUpdate();
    } catch (error) {
      alert(`Erro ao desativar produtos: ${(error as AxiosError).message}`);
    }
  };

  const handleDeactivate = () => {
    deactivateSelectedProducts(selectionModel as number[]);
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
          {"Desativar produtos?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Produtos desativados não aparecerão para os clientes, porém ainda
            podem ser recuperados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus variant="outlined">
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

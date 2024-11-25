import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

interface DeleteButtonProps {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);
  const handleDelete = () => {
    onClick();
    handleClose();
  };

  return (
    <>
      <Button color="error" onClick={() => setIsDialogOpen(true)}>
        Excluir
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deletar endereço?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se este endereço ainda não foi utilizado em um pedido ele será
            deletado, caso contrário ele será apenas desativado. De qualquer
            modo, você não conseguirá mais vê-lo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

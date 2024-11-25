import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useAddressContext } from "../hooks";
import { useState } from "react";

interface DeleteAddressButtonProps {
  addressId: number;
}

export default function DeleteAddressButton({
  addressId,
}: DeleteAddressButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { handleDelete } = useAddressContext();

  const handleClose = () => setIsDialogOpen(false);

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
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleDelete(addressId);
              handleClose();
            }}
            color="error"
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

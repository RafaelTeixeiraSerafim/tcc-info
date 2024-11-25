import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function AlertDialog({
  isOpen,
  onClose,
  onAgree,
}: AlertDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Deletar endereço?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Se este endereço ainda não foi utilizado em um pedido ele será deletado,
          caso contrário ele será apenas desativado. De qualquer modo, você não
          conseguirá mais vê-lo.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

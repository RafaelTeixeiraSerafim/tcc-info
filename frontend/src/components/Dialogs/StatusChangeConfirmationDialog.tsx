import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface AdminAccountDeletionErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function AdminAccountDeletionErrorDialog({
  isOpen,
  onClose,
  onAgree,
}: AdminAccountDeletionErrorDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Alterar status?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          O cliente conseguirá ver o novo status do pedido
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onAgree}>Alterar</Button>
      </DialogActions>
    </Dialog>
  );
}

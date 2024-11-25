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
}

export default function AdminAccountDeletionErrorDialog({
  isOpen,
  onClose,
}: AdminAccountDeletionErrorDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Não é possível excluir a única conta de administrador"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          É necessário pelo menos um administrador
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

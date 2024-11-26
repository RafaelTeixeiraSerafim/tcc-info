import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DisabledUserLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DisabledUserLoginDialog({
  isOpen,
  onClose,
}: DisabledUserLoginDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"A sua conta foi desativada"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Se você desejar reativá-la, entre em contato conosco pelo email
          <Typography color="secondary" display={"inline"}>
            {" "}
            rafael.teixeiraserafim@gmail.com
          </Typography>{" "}
          ou pelo telefone{" "}
          <Typography color="secondary" display={"inline"}>
            (48) 99631-2562
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

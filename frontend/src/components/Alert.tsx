import { Alert, AlertProps } from "@mui/material";

interface ActionAlertProps {
  onClose: () => void;
  message: string;
  variant?: AlertProps["variant"];
  severity?: AlertProps["severity"];
}

export default function ActionAlert({
  onClose,
  message,
  variant = "filled",
  severity = "success",
}: ActionAlertProps) {
  return (
    <Alert
      severity={severity}
      variant={variant}
      sx={{
        position: "fixed",
        bottom: "0.25rem",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: "30%",
        zIndex: 100000,
      }}
      onClose={onClose}
    >
      {message}
    </Alert>
  );
}

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <IconButton
      size="small"
      onClick={onClick}
      sx={{
        aspectRatio: 1
      }}
    >
      <CloseIcon />
    </IconButton>
  );
}

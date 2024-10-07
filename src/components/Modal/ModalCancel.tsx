import { Button } from "@mui/material";
import React from "react";
import { useModalContext } from "./ModalContext";

export default function ModalCancel() {
  const { handleClose } = useModalContext();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    handleClose();
  };

  return (
    <Button
      variant="outlined"
      onClick={handleCancel}
      sx={{
        flex: 1,
      }}
    >
      Cancelar
    </Button>
  );
}

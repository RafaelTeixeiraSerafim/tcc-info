import { Box, Modal } from "@mui/material";
import React from "react";

interface FormModalProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactElement;
}

export default function FormModal({
  handleSubmit,
  isOpen,
  handleClose,
  children,
}: FormModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
        onSubmit={handleSubmit}
      >
        {children}
      </Box>
    </Modal>
  );
}

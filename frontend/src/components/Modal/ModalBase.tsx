import { Box, Modal } from "@mui/material";
import React from "react";

interface FormModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export default function ModalBase({
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
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "26rem",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflowY: "scroll",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}

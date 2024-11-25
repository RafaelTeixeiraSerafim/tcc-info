import { Box, Modal } from "@mui/material";
import React, { CSSProperties } from "react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function ModalBase({
  isOpen,
  onClose,
  children,
  style,
}: FormModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
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
          minWidth: "32rem",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflowY: "scroll",
          ...style,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}

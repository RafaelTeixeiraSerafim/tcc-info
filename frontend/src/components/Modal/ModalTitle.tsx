import { Typography } from "@mui/material";
import React from "react";
// import { useModalContext } from "./ModalContext";

interface ModalTitle {
  children: React.ReactNode;
}

export default function ModalTitle({ children }: ModalTitle) {
  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center">
        {children}
      </Typography>
    </>
  );
}

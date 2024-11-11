import { Typography } from "@mui/material";
import React, { CSSProperties } from "react";
// import { useModalContext } from "./ModalContext";

interface ModalTitle {
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function ModalTitle({ children, style }: ModalTitle) {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: "center",
          width: "100%",
          ...style,
        }}
      >
        {children}
      </Typography>
    </>
  );
}

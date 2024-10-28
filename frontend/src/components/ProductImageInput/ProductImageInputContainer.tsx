import { Box, useTheme } from "@mui/material";
import React from "react";

interface ProductImageInputContainerProps {
  children: React.ReactNode;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function ProductImageInputContainer({
  children,
  handleOpen,
}: ProductImageInputContainerProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: "1rem",
        borderColor: `rgba(${theme.palette.common.onBackgroundChannel} / 0.23) !important`,
        color: `rgba(${theme.palette.common.onBackgroundChannel} / 0.23) !important`,
        position: "relative",
        overflow: "visible",
        border: "1px solid",
        borderRadius: theme.shape.borderRadius,
        textAlign: "center",
        cursor: "pointer",
        pointerEvents: "auto",
        width: "100%",
        minHeight: "12rem",
        ":hover": {
          borderColor: `${theme.palette.text.primary} !important`,
          color: `${theme.palette.text.primary} !important`,
        },
        ":focus-within": {
          borderColor: `${theme.palette.primary.main} !important`,
        },
      }}
      onClick={handleOpen}
    >
      {children}
    </Box>
    // <div className="product-image-container-dark">Hey</div>
  );
}

import { Box, useTheme } from "@mui/material";
import React from "react";
import useProductImageInputContext from "./useProductImageInputContext";

interface ProductImageInputContainerProps {
  children: React.ReactNode;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function ProductImageInputContainer({
  children,
  handleOpen,
}: ProductImageInputContainerProps) {
  const { isHovering, setIsHovering } = useProductImageInputContext();
  const theme = useTheme();

  return (
    <Box
      component={"div"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: isHovering
          ? `${theme.palette.text.primary} !important`
          : `rgba(${theme.palette.common.onBackgroundChannel} / 0.23) !important`,
        color: isHovering
          ? `${theme.palette.text.primary} !important`
          : `rgba(${theme.palette.common.onBackgroundChannel} / 0.23) !important`,
        position: "relative",
        overflow: "hidden",
        border: "1px solid",
        borderRadius: theme.shape.borderRadius,
        textAlign: "center",
        cursor: "pointer",
        pointerEvents: "auto",
        width: "100%",
        aspectRatio: "1 / 1.1",
      }}
      onClick={handleOpen}
    >
      {children}
    </Box>
  );
}

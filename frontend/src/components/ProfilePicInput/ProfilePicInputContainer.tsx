import { Box, alpha } from "@mui/material";
import React, { CSSProperties } from "react";

interface ProfilePicInputContainerProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  style?: CSSProperties;
}

export default function ProfilePicInputContainer({
  children,
  onClick,
  style
}: ProfilePicInputContainerProps) {
  return (
    <Box
      onClick={onClick}
      sx={(theme) => {
        return {
          position: "relative",
          overflow: "visible",
          // border: "1px solid",
          outline: "1px solid",
          outlineColor:
            theme.palette.mode === "dark"
              ? alpha("#fff", 0.2)
              : alpha("#000", 0.2),
          borderRadius: "50rem",
          display: "inline-block",
          textAlign: "center",
          cursor: "pointer",
          width: "10rem",
          height: "10rem",
          zIndex: 10,
          ":hover": {
            outlineColor: theme.palette.mode === "dark" ? "#fff" : "#000",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          },
          ...style
        };
      }}
    >
      {children}
    </Box>
  );
}

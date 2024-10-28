import { Box, alpha } from "@mui/material";
import React from "react";

interface ProfilePicInputContainerProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function ProfilePicInputContainer({
  children,
  onClick,
}: ProfilePicInputContainerProps) {
  return (
    <Box
      onClick={onClick}
      sx={(theme) => {
        return {
          position: "relative",
          overflow: "visible",
          marginTop: 20,
          border: "1px solid",
          borderColor:
            theme.palette.mode === "dark"
              ? alpha("#fff", 0.2)
              : alpha("#000", 0.2),
          borderRadius: "50rem",
          display: "inline-block",
          textAlign: "center",
          cursor: "pointer",
          width: "8.125rem",
          height: "8.125rem",
          zIndex: 10,
          ":hover": {
            borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          },
        };
      }}
    >
      {children}
    </Box>
  );
}

import React, { useState } from "react";

export default function useImageInputMenu() {
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const isOpen = Boolean(menuPosition);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuPosition(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  const resetMenuPosition = () => {
    setMenuPosition(null);
  };

  return { menuPosition, isOpen, handleClose, handleOpen, resetMenuPosition };
}

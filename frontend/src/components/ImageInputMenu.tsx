import { Menu, MenuItem, TextField } from "@mui/material";
import React, { useRef } from "react";

interface ImageInputMenuProps {
  isOpen: boolean;
  menuPosition: {
    top: number;
    left: number;
  } | null;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onPhotoRemove: (event: React.MouseEvent<HTMLElement>) => void;
  required?: boolean;
}

export default function ImageInputMenu({
  isOpen,
  menuPosition,
  onClose,
  onChange,
  onPhotoRemove,
  required,
}: ImageInputMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    fileInputRef.current?.click();
  };

  const menuId = "primary-search-account-menu";
  return (
    <Menu
      anchorReference="anchorPosition"
      anchorPosition={menuPosition!}
      id={menuId}
      keepMounted
      open={isOpen}
      onClose={onClose}
    >
      <MenuItem onClick={handleMenuItemClick} key={"btnUploadPhoto"}>
        Nova imagem
        <TextField
          type="file"
          id="imgInput"
          required={required}
          inputRef={fileInputRef}
          inputProps={{
            accept: "image/*",
            onChange: onChange,
          }}
          sx={{
            display: "none",
          }}
        />
      </MenuItem>
      <MenuItem onClick={onPhotoRemove}>Remover imagem</MenuItem>
    </Menu>
  );
}

import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useWishlistContext from "../../hooks/useWishlistContext";
import { CSSProperties } from "react";

interface RemoveWishlistItemButtonProps {
  wishlistItemId: number;
  style?: CSSProperties;
}

export default function RemoveWishlistItemButton({
  wishlistItemId,
  style,
}: RemoveWishlistItemButtonProps) {
  const { removeItem } = useWishlistContext();

  return (
    <IconButton onClick={(e) => removeItem(e, wishlistItemId)} style={style}>
      <DeleteOutlineIcon color="primary" />
    </IconButton>
  );
}

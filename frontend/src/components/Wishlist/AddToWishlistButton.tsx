import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { useUserContext } from "../../hooks";
import useWishlistContext from "../../hooks/useWishlistContext";
import { IWishlistItem } from "../../interfaces";

interface AddToWishlistButtonProps {
  productId: number;
  style?: CSSProperties;
}

export default function AddToWishlistButton({
  productId,
  style,
}: AddToWishlistButtonProps) {
  const [wishlistItem, setWishlistItem] = useState<IWishlistItem | null>(null);
  const { user } = useUserContext();
  const { getWishlistItem, addItem, removeItem } = useWishlistContext();

  useEffect(() => {
    if (!user) return;
    setWishlistItem(getWishlistItem(user.id, productId) || null);
  }, [user, productId, getWishlistItem]);

  return (
    <>
      {wishlistItem ? (
        <IconButton onClick={(e) => removeItem(e, wishlistItem.id)} sx={style}>
          <Favorite color="primary" />
        </IconButton>
      ) : (
        <IconButton onClick={(e) => addItem(e, productId)} sx={style}>
          <FavoriteBorder />
        </IconButton>
      )}
    </>
  );
}

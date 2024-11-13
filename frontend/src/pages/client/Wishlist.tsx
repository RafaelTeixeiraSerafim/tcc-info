import { Box, Paper, Typography } from "@mui/material";
import WishlistCard from "../../components/Wishlist/WishlistCard";
import useWishlistContext from "../../hooks/useWishlistContext";

export default function Wishlist() {
  const { wishlist } = useWishlistContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        mb: "3rem",
        width: "80%",
        marginInline: "auto",
      }}
    >
      <Typography component="h1" variant="h4">
        Lista de desejos
      </Typography>
      {wishlist.length === 0 && (
        <Paper
          sx={{
            padding: "2rem",
            minHeight: "15rem",
          }}
        >
          <Typography>Parece que sua lista de desejos está vazia...</Typography>
        </Paper>
      )}
      {wishlist.map((wishlistItem) => (
        <WishlistCard wishlistItem={wishlistItem} key={wishlistItem.id} />
      ))}
    </Box>
  );
}

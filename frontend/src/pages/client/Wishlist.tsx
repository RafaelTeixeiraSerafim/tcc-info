import { Box, Paper, Stack, Typography } from "@mui/material";
import WishlistCard from "../../components/Wishlist/WishlistCard";
import useWishlistContext from "../../hooks/useWishlistContext";
import EmptyWishlistImg from "../../assets/images/empty_wishlist.png";

export default function Wishlist() {
  const { wishlist } = useWishlistContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        mb: "3rem",
        mt: "3rem",
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
            display: "flex",
            flexDirection: "row",
            gap: "3rem",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <Typography variant="h6" alignSelf={"center"} color="text.secondary">
            Parece que sua lista de desejos está vazia...
          </Typography>
          <img src={EmptyWishlistImg} alt="" width={"40%"} />
        </Paper>
      )}
      <Stack gap={"0.5rem"}>
        {wishlist.map((wishlistItem) => (
          <WishlistCard wishlistItem={wishlistItem} key={wishlistItem.id} />
        ))}
      </Stack>
    </Box>
  );
}

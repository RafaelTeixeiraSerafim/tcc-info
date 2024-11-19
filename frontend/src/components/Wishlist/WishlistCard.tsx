import { Paper, Box, Typography } from "@mui/material";
import { formatDate } from "../../utils/helpers";
import PriceDisplay from "../PriceDisplay";
import RemoveWishlistItemButton from "./RemoveWishlistItemButton";
import { IWishlistItem } from "../../interfaces";
import RouterLink from "../RouterLink";

interface WishlistCard {
  wishlistItem: IWishlistItem;
}

export default function WishlistCard({ wishlistItem }: WishlistCard) {
  return (
    <RouterLink to={`/product/${wishlistItem.product.id}`}>
      <Paper
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "15% 85%",
          padding: "1.5rem",
          gap: "1rem",
        }}
      >
        <RemoveWishlistItemButton
          wishlistItemId={wishlistItem.id}
          style={{ position: "absolute", top: 20, right: 20 }}
        />
        <Box
          component={"img"}
          src={wishlistItem.product.images[0].url}
          sx={(theme) => {
            return {
              width: "100%",
              outline: "solid 1px",
              outlineColor: "#b3b3b3",
              borderRadius: theme.shape.borderRadius / 4,
            };
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography>{wishlistItem.product.name}</Typography>
          <PriceDisplay
            origPrice={wishlistItem.product.origPrice}
            salePrice={wishlistItem.product.salePrice}
            size="small"
          />
          <Typography color="gray">
            {formatDate(wishlistItem.createdAt)}
          </Typography>
        </Box>
      </Paper>
    </RouterLink>
  );
}

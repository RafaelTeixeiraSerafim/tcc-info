import { Box, Card, Typography } from "@mui/material";
import { IProduct } from "../interfaces";
import AddToWishlistButton from "./Wishlist/AddToWishlistButton";
import PriceDisplay from "./PriceDisplay";

export interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "13rem",
        gap: "0.25rem",
        bgcolor: "#fff",
        paddingBottom: "1rem",
        textAlign: "center",
      }}
    >
      <AddToWishlistButton
        productId={product.id}
        style={{ position: "absolute", top: 0, right: 0 }}
      />
      <Box
        component={"img"}
        src={product.images?.[0]?.url || ""}
        alt=""
        height={"13rem"}
        loading="lazy"
      />
      <Box
        sx={{
          paddingInline: "1rem",
        }}
      >
        <Box
          sx={{
            height: "4rem",
            overflow: "hidden",
          }}
        >
          <Typography variant="h6">{product.name}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "3rem",
          }}
        >
          <PriceDisplay
            origPrice={product.origPrice}
            salePrice={product.salePrice}
            size="small"
          />
        </Box>
      </Box>
    </Card>
  );
}

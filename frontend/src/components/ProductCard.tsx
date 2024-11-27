import { Box, Card, Rating, Stack, Typography } from "@mui/material";
import { IProduct } from "../interfaces";
import PriceDisplay from "./PriceDisplay";
import AddToWishlistButton from "./Wishlist/AddToWishlistButton";

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
        width: "14rem",
        height: "24rem",
        gap: "0.25rem",
        bgcolor: "#fff",
        paddingBottom: "1rem",
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
        loading="lazy"
        height={"13rem"}
        width={"fit-content"}
        alignSelf={"center"}
      />
      <Stack
        sx={{
          flex: 1,
          paddingInline: "1rem",
        }}
      >
        <Stack>
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              height: "4rem",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            variant="h6"
          >
            {product.name}
          </Typography>
          <Stack direction="row" alignItems="center" gap={"0.1rem"}>
            <Rating
              value={product.rating}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography fontSize={"0.875rem"}>
              ({product.numOfReviews})
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center"
            // justifyContent: "center",
            // height: "3rem",
          }}
        >
          {product.stockQty ? (
            <PriceDisplay
              origPrice={product.origPrice}
              salePrice={product.salePrice || 0}
              size="small"
            />
          ) : (
            <Typography variant="h6" sx={{ opacity: "70%" }}>
              Indisponível
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  );
}

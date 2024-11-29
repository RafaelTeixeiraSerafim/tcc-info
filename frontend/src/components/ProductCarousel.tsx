import { Link } from "react-router-dom";
import { IProduct } from "../interfaces";
import { Box, Typography, useTheme } from "@mui/material";
import ProductCard from "./ProductCard";
import TitleUnderline from "./TitleUnderline";

interface ProductCarouselProps {
  title: string;
  products: IProduct[];
}

export default function ProductCarousel({
  title,
  products,
}: ProductCarouselProps) {
  const theme = useTheme();

  return (
    <Box>
      <Typography component={"span"} variant="h3" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <TitleUnderline style={{ color: theme.palette.primary.main }} />
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll",
          gap: "2rem",
          paddingBottom: "1rem",
        }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`product/${product.id}`}
            state={product}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </Box>
    </Box>
  );
}

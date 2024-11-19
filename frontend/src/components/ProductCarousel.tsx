import { Link } from "react-router-dom";
import { IProduct } from "../interfaces";
import { Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import TitleUnderline from "./TitleUnderline";

interface ProductCarouselProps {
  categoryName: string;
  products: IProduct[];
}

export default function ProductCarousel({
  categoryName,
  products,
}: ProductCarouselProps) {
  return (
    <Box>
      <Typography component={"span"} variant="h3" sx={{ fontWeight: "bold" }}>
        {categoryName}
      </Typography>
      <TitleUnderline />
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll",
          gap: "2rem",
        }}
      >
        {products.map((product) => (
          <>
            {product.category.name === categoryName &&
              (parseInt(product.stockQty) > 0 ? (
                <Link
                  key={product.id}
                  to={`product/${product.id}`}
                  state={product}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ProductCard product={product} />
                </Link>
              ) : (
                <ProductCard product={product} key={product.id} />
              ))}
          </>
        ))}
      </Box>
    </Box>
  );
}

import { Link } from "react-router-dom";
import { IProduct } from "../interfaces";
import { Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

interface ProductCarouselProps {
  categoryName: string;
  products: IProduct[];
}

export default function ProductCarousel({
  categoryName,
  products,
}: ProductCarouselProps) {
  return (
    <Box sx={{ marginInline: "1rem" }}>
      <Typography component={"span"} variant="h3" sx={{ fontWeight: "bold" }}>
        {categoryName}
      </Typography>
      <hr
        style={{
          color: "#d3d3d3",
          marginBottom: "1.5rem",
          height: 1,
        }}
      ></hr>
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll",
          gap: 2,
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

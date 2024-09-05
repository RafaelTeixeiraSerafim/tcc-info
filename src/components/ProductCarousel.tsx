import React from 'react'
import { Product } from '../interfaces';
import { Box, Typography } from '@mui/material';

interface ProductCarouselProps {
  categoryName: string;
  products: Product[];
}

export default function ProductCarousel({categoryName, products}: ProductCarouselProps) {
  return (
    <Box>
      <Typography>{categoryName}</Typography>
      <Box
      sx={{
        display: "flex",
        gap: 2
      }}
      >
        {products.map((product) => (
          <Box
          sx={{
            width: "10rem"
          }}
          >
            <img src={product.productItems[0].images[0].url} alt="" width={"100%"}/>
            <Typography>{product.name}</Typography>
            <Typography>R${product.productItems[0].origPrice}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

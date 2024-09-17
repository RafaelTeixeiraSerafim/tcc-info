import { Box, Button, Card, Paper, Typography } from "@mui/material";
import React from "react";
import { IProduct } from "../interfaces";

export interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "15rem",
        gap: "0.25rem",
        bgcolor: "#fff",
        paddingBlock: "1rem",
      }}
    >
      <img src={product.images[0].url} alt="" width={"100%"} />
      <Typography variant="h5">{product.name}</Typography>
      {product.salePrice ? (
        <>
          <Typography
            component={"s"}
            variant="subtitle2"
            sx={{ color: "#666" }}
          >
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(parseFloat(product.origPrice))}
          </Typography>
          <Typography variant="h5" fontWeight={"bold"}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(parseFloat(product.salePrice))}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" fontWeight={"bold"}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(parseFloat(product.origPrice))}
        </Typography>
      )}
    </Box>
  );
}

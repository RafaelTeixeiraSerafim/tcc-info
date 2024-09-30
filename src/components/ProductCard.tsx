import { Box, Typography } from "@mui/material";
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
        width: "13rem",
        gap: "0.25rem",
        bgcolor: "#fff",
        paddingBottom: "1rem",
        textAlign: "center",
      }}
    >
      <Box
        component={"img"}
        src={product.images[0].url}
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
      </Box>
    </Box>
  );
}

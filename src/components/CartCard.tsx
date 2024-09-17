import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { IOrderItemResponse } from "../interfaces";
import axiosInstance from "../config/axiosInstance";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface CartCardProps {
  cartItem: IOrderItemResponse;
  setCartItems: React.Dispatch<
    React.SetStateAction<IOrderItemResponse[] | null>
  >;
}

export default function CartCard({ cartItem, setCartItems }: CartCardProps) {
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    cartItemId: number
  ) => {
    axiosInstance
      .delete(`api/v1/order-items/${cartItemId}`)
      .then((response) => {
        console.log(response);
        setCartItems((prevCartItems) =>
          prevCartItems!.filter((cartItem) => cartItem.id !== cartItemId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: "1rem",
      }}
    >
      <Box
        component={"img"}
        src={cartItem.product.images[0].url}
        width={"30%"}
      />
      <Box>
        <Typography variant="h5">{cartItem.product.name}</Typography>
        {cartItem.product.salePrice ? (
          <Box>
            <Typography
              component={"s"}
              variant="subtitle2"
              sx={{ color: "#666" }}
            >
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(parseFloat(cartItem.product.origPrice))}
            </Typography>
            <Typography variant="h5" fontWeight={"bold"}>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(parseFloat(cartItem.product.salePrice))}
            </Typography>
          </Box>
        ) : (
          <Typography variant="h5" fontWeight={"bold"}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(parseFloat(cartItem.product.origPrice))}
          </Typography>
        )}
        <Typography>Qtde: {cartItem.qty}</Typography>
      </Box>
      <IconButton
        onClick={(e) => handleDelete(e, cartItem.id)}
        sx={{ position: "absolute", right: 0 }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}

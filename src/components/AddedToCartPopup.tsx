import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IOrderItem } from "../interfaces";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useUserContext } from "../hooks";
import useTotal from "../hooks/useTotal";

export default function AddedToCartPopup() {
  const [cartItems, setCartItems] = useState<IOrderItem[] | null>(null);

  const { hasErrorCart, user } = useUserContext();
  const { total } = useTotal(cartItems);

  const getCartItems = () => {
    if (!user?.id) return;

    axiosInstance
      .get<IOrderItem[]>(`/api/v1/order-items/${user.id}`)
      .then((response) => {
        console.log(response);
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    cartItemId: number
  ) => {
    axiosInstance
      .delete(`/api/v1/order-items/${cartItemId}`)
      .then((response) => {
        console.log(response);
        setCartItems(
          cartItems!.filter((cartItem) => cartItem.id !== cartItemId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCartItems();
  }, [user?.id]);

  return (
    <>
      {cartItems && (
        <Paper
          elevation={5}
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "23rem",
            padding: "1rem",
            left: "50%",
            transform: "translate(-70%, 0)",
          }}
        >
          <Typography variant="h6" component={"h1"}>
            MEU CARRINHO
          </Typography>
          {cartItems.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {cartItems.map((cartItem) => (
                <Box
                  sx={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "35% 65%",
                    gap: "0.5rem",
                  }}
                >
                  <Box
                    component={"img"}
                    src={cartItem.product.images[0].url}
                    width={"100%"}
                  />
                  <Box>
                    <Box
                      sx={{
                        width: "80%",
                        height: "3rem",
                        overflow: "scroll",
                      }}
                    >
                      <Typography fontWeight={"bold"}>
                        {cartItem.product.name}
                      </Typography>
                    </Box>
                    <Typography>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        parseFloat(
                          cartItem.product.salePrice ||
                            cartItem.product.origPrice
                        )
                      )}
                    </Typography>
                    <Typography>Qtde: {cartItem.qty}</Typography>
                  </Box>
                  <IconButton
                    onClick={(e) => handleDelete(e, cartItem.id)}
                    sx={{ position: "absolute", right: 0 }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              ))}
              <Typography fontWeight={"bold"} variant="h6">
                Total:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </Typography>
              <Button href="/cart" variant="contained">
                Ir para meu carrinho
              </Button>
            </Box>
          ) : (
            <Typography>Carrinho vazio</Typography>
          )}
        </Paper>
      )}
    </>
  );
}

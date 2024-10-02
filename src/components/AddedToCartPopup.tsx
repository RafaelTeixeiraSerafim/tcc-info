import {
  Box,
  Button,
  Icon,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IOrderItem } from "../interfaces";
import UserContext from "../contexts/UserContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function AddedToCartPopup() {
  const [cartItems, setCartItems] = useState<IOrderItem[] | null>(null);
  const [total, setTotal] = useState(0);

  const { hasErrorCart, user } = useContext(UserContext);

  const getTotal = () => {
    let sum = 0;
    cartItems?.forEach((cartItem) => {
      let price = 0;
      price =
        cartItem.qty *
        (parseFloat(cartItem.product.salePrice) ||
          parseFloat(cartItem.product.origPrice));
      sum += price;
    });

    setTotal(sum);
  };

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

  useEffect(() => {
    if (!cartItems?.length) return;

    getTotal();
  }, [cartItems?.length]);

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

import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IOrderItemResponse } from "../interfaces";
import { Box, Button, Paper, Typography } from "@mui/material";
import UserContext from "../contexts/UserContext";
import CartCard from "../components/CartCard";

export default function Cart() {
  const [cartItems, setCartItems] = useState<IOrderItemResponse[] | null>(null);
  const [total, setTotal] = useState(0);

  const { user } = useContext(UserContext);

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
      .get(`api/v1/order-items/${user.id}`)
      .then((response) => {
        console.log(response);
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePurchase = () => {
    if (!cartItems || cartItems.length === 0) return;

    axiosInstance
      .put(`api/v1/orders/place-order/${cartItems[0].order.id}`, {
        datePlaced: Date.now(),
        status: "PENDING",
      })
      .then((response) => {
        console.log(response);
        alert("Compra finalizada com sucesso!");
        setCartItems([]);
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            mt: "7rem",
            width: "60%",
            marginInline: "auto",
            padding: "1rem"
          }}
        >
          <Typography variant="h4">Meu Carrinho</Typography>
          {cartItems.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {cartItems.map((cartItem) => (
                <CartCard cartItem={cartItem} setCartItems={setCartItems} />
              ))}
              <Typography fontWeight={"bold"} variant="h5">
                Total:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </Typography>
              <Button variant="contained" onClick={handlePurchase}>
                Finalizar Compra
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

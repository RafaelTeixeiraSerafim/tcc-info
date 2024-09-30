import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IOrder } from "../interfaces";
import { Box, Button, Paper, Typography } from "@mui/material";
import UserContext from "../contexts/UserContext";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [total, setTotal] = useState(0);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getTotal = () => {
    if (!order) return;

    let sum = 0;
    order.orderItems.forEach((orderItem) => {
      let price = 0;
      price =
        orderItem.qty *
        (parseFloat(orderItem.product.salePrice) ||
          parseFloat(orderItem.product.origPrice));
      sum += price;
    });

    setTotal(sum);
  };

  const getOrder = () => {
    if (!user) return;

    axiosInstance
      .get(`api/v1/orders/user/${user.id}`)
      .then((response) => {
        console.log(response);
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePurchase = () => {
    if (!order) return;

    axiosInstance
      .put(`api/v1/orders/place-order/${order.id}`, {
        datePlaced: Date.now(),
        status: "PENDING",
      })
      .then((response) => {
        console.log(response);
        alert("Compra finalizada com sucesso!");
        setOrder(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getOrder();
  }, [user?.id]);

  useEffect(() => {
    getTotal();
  }, [order?.orderItems.length]);

  return (
    <>
      {order && (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            mt: "7rem",
            mb: "3rem",
            width: "60%",
            minHeight: "60vh",
            marginInline: "auto",
            padding: "1rem",
          }}
        >
          <Typography variant="h4">Meu Carrinho</Typography>
          {order.orderItems.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {order.orderItems.map((orderItem) => (
                <CartCard cartItem={orderItem} setOrder={setOrder} />
              ))}
              <Typography fontWeight={"bold"} variant="h5">
                Total:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate(`/checkout/address-options`, {state: order})}
              >
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

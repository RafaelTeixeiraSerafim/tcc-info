import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IOrder } from "../interfaces";
import { Box, Button, Paper, Typography } from "@mui/material";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks";
import useTotal from "../hooks/useTotal";

export default function Cart() {
  const [order, setOrder] = useState<IOrder | null>(null);

  const { user } = useUserContext();
  const navigate = useNavigate();
  const { total } = useTotal(order?.orderItems || null);

  const getOrder = () => {
    if (!user) return;

    axiosInstance
      .get(`/api/v1/orders/user/${user.id}`)
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
      .put(`/api/v1/orders/place-order/${order.id}`, {
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
                onClick={() =>
                  navigate(`/checkout/address-options`, { state: order })
                }
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

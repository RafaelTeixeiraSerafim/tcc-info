import { Box, Paper, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import OrderStatus from "../../components/OrderStatus";
import axiosInstance from "../../config/axiosInstance";
import { useUserContext } from "../../hooks";
import { IOrderResponse } from "../../interfaces";
import { formatDate } from "../../utils/helpers";

export default function Purchases() {
  const [purchases, setPurchases] = useState<IOrderResponse[]>([]);

  const { user } = useUserContext();

  const getRemainingDays = (days: number, datePlaced: string) => {
    return days - (new Date().getDate() - new Date(datePlaced).getDate());
  };

  useEffect(() => {
    const getPurchases = async (userId: number) => {
      try {
        const response = await axiosInstance.get<IOrderResponse[]>(
          `/users/${userId}/orders`
        );
        console.log(response);
        // setPurchases(
        //   response.data.sort(
        //     (a, b) =>
        //       daysIn(new Date(a.datePlaced)) - daysIn(new Date(b.datePlaced))
        //   )
        // );
        setPurchases(response.data);
      } catch (error) {
        alert(`Erro ao pegar compras: ${(error as AxiosError).message}`);
      }
    };

    if (user) getPurchases(user.id);
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        mb: "3rem",
        mt: "3rem",
        width: "80%",
        marginInline: "auto",
      }}
    >
      <Typography component="h1" variant="h4">
        Compras
      </Typography>
      {purchases.map((purchase) => (
        <Paper
          sx={{
            display: "grid",
            // gridTemplateColumns: "0.2fr 1fr",
            gridTemplateColumns: "15% 85%",
            padding: "2rem",
            gap: "1rem",
          }}
          key={purchase.id}
        >
          <Box
            component={"img"}
            src={purchase.orderItems[0].product.images[0].url}
            sx={(theme) => {
              return {
                width: "100%",
                outline: "solid 1px",
                outlineColor: "#b3b3b3",
                borderRadius: theme.shape.borderRadius / 4,
              };
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <OrderStatus status={purchase.status} />
            <Box>
              <Typography>
                Pedido feito no dia {formatDate(purchase.datePlaced)}
              </Typography>
              {purchase.dateDelivered && purchase.status === "DELIVERED" ? (
                <Typography>
                  Chegou no dia {formatDate(purchase.dateDelivered)}
                </Typography>
              ) : (
                <>
                  {purchase.status === "SHIPPED" && (
                    <Typography>
                      Chegará entre{" "}
                      {getRemainingDays(
                        purchase.deliveryMinDays,
                        purchase.datePlaced
                      )}{" "}
                      e{" "}
                      {getRemainingDays(
                        purchase.deliveryMaxDays,
                        purchase.datePlaced
                      )}{" "}
                      dias
                    </Typography>
                  )}
                </>
              )}
            </Box>
            {purchase.orderItems.length > 1 ? (
              <Typography color="gray">
                {purchase.orderItems.length} produtos
              </Typography>
            ) : (
              <Typography color="gray">
                {purchase.orderItems[0].product.name}
              </Typography>
            )}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

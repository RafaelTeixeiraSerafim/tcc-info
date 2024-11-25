import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import OrderItems from "../../components/OrderItems";
import axiosInstance from "../../config/axiosInstance";
import { useTotal } from "../../hooks";
import { IOrder } from "../../interfaces";
import {
  formatCurrency,
  formatDatetime,
  formatPhone,
  formatPostalCode,
  translateStatus,
} from "../../utils/helpers";

export default function PurchaseDetails() {
  const location = useLocation();
  const orderState: IOrder = location.state;

  const [order, setOrder] = useState<IOrder | null>(orderState || null);

  const { purchaseId } = useParams();
  const { subtotal } = useTotal(order?.orderItems || []);

  const getOrder = (orderId: string) => {
    axiosInstance
      .get(`/orders/${orderId}`)
      .then((response) => {
        console.log(response);
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!purchaseId) return;
    getOrder(purchaseId);
  }, [purchaseId]);

  return (
    <>
      {order && (
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
          <Typography variant="h4" component={"h1"}>
            Detalhes do Pedido
          </Typography>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              padding: "1rem",
            }}
          >
            <Stack gap={"0.5rem"}>
              <Typography color="text.secondary" fontSize={"0.875rem"}>
                Pedido
              </Typography>
              <Stack direction={"row"}>
                <Stack flex={1}>
                  <Typography>
                    <strong>Id:</strong> {order?.id}
                  </Typography>
                  <Typography>
                    <strong>Data do pedido:</strong>{" "}
                    {formatDatetime(order.datePlaced)}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <Typography>
                      <strong>Status:</strong> {translateStatus(order?.status)}{" "}
                    </Typography>
                  </Box>
                </Stack>
                <Stack flex={1}>
                  <Typography>
                    <strong>Subtotal:</strong> {formatCurrency(subtotal)}
                  </Typography>
                  <Typography>
                    <strong>Frete:</strong> {formatCurrency(order.shippingFee)}
                  </Typography>
                  <Typography>
                    <strong>Total:</strong>{" "}
                    {formatCurrency(subtotal + order.shippingFee)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Divider />
            <Stack gap="0.5rem">
              <Typography color="text.secondary" fontSize={"0.875rem"}>
                Contato
              </Typography>
              <Stack direction={"row"}>
                <Typography flex={1}>
                  <strong>Nome completo:</strong> {order.address.fullName}
                </Typography>
                <Typography flex={1}>
                  <strong>Telefone de contato:</strong>{" "}
                  {formatPhone(order.address.contactPhone)}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack gap="0.5rem">
              <Typography color="text.secondary" fontSize={"0.875rem"}>
                Endereço
              </Typography>
              <Stack direction={"row"}>
                <Stack flex={1}>
                  <Typography>
                    <strong>CEP:</strong>{" "}
                    {formatPostalCode(order.address.postalCode)}
                  </Typography>
                  <Typography>
                    <strong>Estado:</strong> {order.address.state}
                  </Typography>
                  <Typography>
                    <strong>Cidade:</strong> {order.address.city}
                  </Typography>
                  <Typography>
                    <strong>Bairro:</strong> {order.address.neighbourhood}
                  </Typography>
                </Stack>
                <Stack flex={1}>
                  <Typography>
                    <strong>Rua/Avenida:</strong> {order.address.street}
                  </Typography>
                  <Typography>
                    <strong>Número:</strong> {order.address.houseNumber}
                  </Typography>
                  <Typography>
                    <strong>Complemento:</strong>{" "}
                    {order.address.apartmentNumber || "-"}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          <Stack gap={"0.5rem"}>
            <Typography variant="h4">Itens</Typography>
            <OrderItems orderItems={order.orderItems} size="small" to={`/product/:id`} />
          </Stack>
        </Box>
      )}
    </>
  );
}

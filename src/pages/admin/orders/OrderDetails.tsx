import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IOrder } from "../../../interfaces";
import axiosInstance from "../../../config/axiosInstance";
import { Box, Button, Paper, Typography } from "@mui/material";
import StatusModal from "../../../components/StatusModal";
import { formatCurrency, translateStatus } from "../../../utils/helpers";
import { getOrderItemPrice } from "../../../utils/helpers";
import useTotal from "../../../hooks/useTotal";

export default function OrderDetails() {
  const location = useLocation();
  const orderState: IOrder = location.state;

  const [order, setOrder] = useState<IOrder | null>(orderState || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { orderId } = useParams();
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
    if (!orderId) return;
    getOrder(orderId);
  }, [orderId]);

  return (
    <>
      {order && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
            width: "70%",
            textAlign: "left",
          }}
        >
          <Typography variant="h3" component={"h1"}>
            Detalhes do Pedido
          </Typography>
          <Paper
            sx={{
              width: "100%",
              padding: "1rem",
            }}
          >
            <Typography>
              <strong>Id:</strong> {order?.id}
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
              <Button onClick={() => setIsModalOpen(true)}>
                Alterar status
              </Button>
            </Box>
            <Typography>
              <strong>Data do pedido:</strong>{" "}
              {new Date(order?.datePlaced).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Total:</strong>{" "}
              {formatCurrency(subtotal)}
            </Typography>
            <Typography>
              <strong>Nome do usuário:</strong> {order?.user.username}
            </Typography>
            <Typography>
              <strong>Email:</strong> {order?.user.email}
            </Typography>
            <StatusModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              order={order}
              setOrder={setOrder}
            />
          </Paper>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              overflow: "scroll",
              gap: "2rem",
            }}
          >
            {order?.orderItems.map((orderItem) => (
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "13rem",
                  overflow: "hidden",
                }}
              >
                <Box component={"img"} src={orderItem.product.images[0].url} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.1rem",
                    paddingInline: "0.5rem",
                    paddingBlock: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      height: "4rem",
                      overflow: "scroll",
                    }}
                  >
                    <Typography variant="h6" fontWeight={"bold"}>
                      {orderItem.product.name}
                    </Typography>
                  </Box>
                  <Typography>Qtde: {orderItem.qty}</Typography>
                  <Typography>
                    Preço unit:{" "}
                    {formatCurrency(
                      parseFloat(orderItem.product.salePrice) ||
                        parseFloat(orderItem.product.origPrice)
                    )}
                  </Typography>
                  <Typography>
                    Preço total:{" "}
                    {formatCurrency(getOrderItemPrice(orderItem))}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

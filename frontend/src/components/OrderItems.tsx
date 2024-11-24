import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { IOrderItem } from "../interfaces";
import { formatCurrency, getOrderItemPrice } from "../utils/helpers";
import RouterLink from "./RouterLink";

interface OrderItemsProps {
  orderItems: IOrderItem[];
}

export default function OrderItems({ orderItems }: OrderItemsProps) {
  const theme = useTheme();

  return (
    <Stack gap={"1rem"}>
      {orderItems.map((orderItem) => (
        <RouterLink to={`/admin/products/${orderItem.product.id}/update`} key={orderItem.id}>
          <Paper
            sx={{
              display: "grid",
              gridTemplateColumns: "20% 80%",
              overflow: "hidden",
              padding: "1rem",
              gap: "1rem",
            }}
          >
            <Box
              component={"img"}
              src={orderItem.product.images[0].url}
              width={"100%"}
              borderRadius={theme.shape.borderRadius / 4}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  maxHeight: "4rem",
                  overflow: "scroll",
                }}
              >
                <Typography variant="h6">
                  {orderItem.product.name}
                </Typography>
              </Box>
              <Box>
                <Typography>Qtde: {orderItem.qty}</Typography>
                <Typography>
                  Preço unit:{" "}
                  {formatCurrency(
                    parseFloat(orderItem.product.salePrice) ||
                      parseFloat(orderItem.product.origPrice)
                  )}
                </Typography>
                <Typography>
                  Preço total: {formatCurrency(getOrderItemPrice(orderItem))}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </RouterLink>
      ))}
    </Stack>
  );
}

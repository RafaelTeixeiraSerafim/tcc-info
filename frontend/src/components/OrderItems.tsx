import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { IOrderItem } from "../interfaces";
import { formatCurrency, getOrderItemPrice } from "../utils/helpers";
import RouterLink from "./RouterLink";
import { To } from "react-router-dom";

interface OrderItemsProps {
  orderItems: IOrderItem[];
  size?: "small" | "medium" | "large";
  to?: To;
}

export default function OrderItems({
  orderItems,
  size = "medium",
  to,
}: OrderItemsProps) {
  const theme = useTheme();

  return (
    <Stack gap={"1rem"}>
      {orderItems.map((orderItem) => (
        <RouterLink
          to={
            to
              ? to.toString().replace(":id", `${orderItem.product.id}`)
              : `/admin/products/${orderItem.product.id}/update`
          }
          key={orderItem.id}
        >
          <Paper
            sx={{
              display: "grid",
              gridTemplateColumns: size === "medium" ? "20% 80%" : "15% 85%",
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
                <Typography variant="h6">{orderItem.product.name}</Typography>
              </Box>
              <Box>
                <Typography>Qtde: {orderItem.qty}</Typography>
                <Typography>
                  Preço unit:{" "}
                  {formatCurrency(
                    parseFloat(orderItem.product.salePrice || "0") ||
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

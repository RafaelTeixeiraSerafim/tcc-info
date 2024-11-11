import { Typography } from "@mui/material";
import { translateStatus } from "../utils/helpers";

interface OrderStatusProps {
  status: "PENDING" | "SHIPPED" | "DELIVERED";
}

const statusColorMap: { [key: string]: string } = {
  PENDING: "#737373",
  SHIPPED: "warning",
  DELIVERED: "success",
};

export default function OrderStatus({ status }: OrderStatusProps) {
  return (
    <Typography color={statusColorMap[status]}>{translateStatus(status)}</Typography>
  );
}

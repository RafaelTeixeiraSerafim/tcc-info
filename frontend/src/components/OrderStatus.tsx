import { Typography, TypographyProps } from "@mui/material";
import { translateStatus } from "../utils/helpers";
import { CSSProperties } from "react";

type OrderStatusProps = TypographyProps & {
  status: "PENDING" | "SHIPPED" | "DELIVERED";
  style?: CSSProperties;
}

const statusColorMap: { [key: string]: string } = {
  PENDING: "textDisabled",
  SHIPPED: "warning",
  DELIVERED: "success",
};

export default function OrderStatus({ status, style, ...rest }: OrderStatusProps) {
  return (
    <Typography color={statusColorMap[status]} sx={style} {...rest}>
      {translateStatus(status)}
    </Typography>
  );
}

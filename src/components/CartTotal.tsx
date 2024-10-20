import { Typography, TypographyProps } from "@mui/material";
import { formatCurrency } from "../utils/helpers";
import useCartContext from "../hooks/useCartContext";

export default function CartTotal({ ...restProps }: TypographyProps) {
  const { total } = useCartContext();

  return (
    <Typography fontWeight={"bold"} variant="h6" {...restProps}>
      Total: {formatCurrency(total)}
    </Typography>
  );
}

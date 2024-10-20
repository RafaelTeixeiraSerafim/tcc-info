import { Typography, TypographyProps } from "@mui/material";
import { formatCurrency } from "../utils/helpers";
import useCartContext from "../hooks/useCartContext";

export default function CartSubtotal({...restProps}: TypographyProps) {
  const { subtotal } = useCartContext();
  
  return (
    <Typography variant="h6" {...restProps}>
      Subtotal: {formatCurrency(subtotal)}
    </Typography>
  );
}

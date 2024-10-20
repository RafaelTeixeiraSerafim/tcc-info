import { Typography, TypographyProps } from "@mui/material";
import { useCartContext } from "../hooks";
import { formatCurrency } from "../utils/helpers";

export default function CartShippingFee({ ...restProps }: TypographyProps) {
  const { selectedShippingOption } = useCartContext();

  return (
    <Typography variant="h6" {...restProps}>
      Frete:{" "}
      {formatCurrency(
        selectedShippingOption ? parseFloat(selectedShippingOption.price) : 0
      )}
    </Typography>
  );
}

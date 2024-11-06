import { Typography, TypographyProps } from "@mui/material";
import { useAddressContext } from "../hooks";
import { formatCurrency } from "../utils/helpers";

export default function CartShippingFee({ ...restProps }: TypographyProps) {
  const { selectedShippingOption } = useAddressContext();

  return (
    <Typography variant="h6" {...restProps}>
      Frete:{" "}
      {selectedShippingOption
        ? formatCurrency(parseFloat(selectedShippingOption.price))
        : "-"}
    </Typography>
  );
}

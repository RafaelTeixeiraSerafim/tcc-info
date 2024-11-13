import { Box, Typography } from "@mui/material";
import { formatCurrency } from "../utils/helpers";
import { IShippingOption } from "../interfaces";

interface ShippingOptionProps {
  optionData: IShippingOption;
}

export default function ShippingOption({ optionData }: ShippingOptionProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box>
        <Typography fontWeight={"bold"}>{optionData.name}</Typography>
        <Typography>
          Chegará entre {optionData.deliveryMinDays} e{" "}
          {optionData.deliveryMaxDays} dias
        </Typography>
      </Box>
      <Typography fontWeight={"bold"}>
        {formatCurrency(parseFloat(optionData.price))}
      </Typography>
    </Box>
  );
}

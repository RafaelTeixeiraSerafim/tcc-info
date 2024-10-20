import { Box, Typography } from "@mui/material";
import { formatCurrency } from "../utils/helpers";

interface PriceDisplayProps {
  origPrice: string;
  salePrice: string;
}

export default function PriceDisplay({
  origPrice,
  salePrice,
}: PriceDisplayProps) {
  return (
    <>
      {salePrice ? (
        <Box>
          <Typography
            component={"s"}
            variant="subtitle1"
            sx={{ color: "#666" }}
          >
            {formatCurrency(parseFloat(origPrice))}
          </Typography>
          <Typography variant="h4" fontWeight={"bold"}>
            {formatCurrency(parseFloat(salePrice))}
          </Typography>
        </Box>
      ) : (
        <Typography variant="h4" fontWeight={"bold"}>
          {formatCurrency(parseFloat(origPrice))}
        </Typography>
      )}
    </>
  );
}

import { Box, Typography } from "@mui/material";
import { formatCurrency } from "../utils/helpers";
import { Variant } from "@mui/material/styles/createTypography";

interface PriceDisplayProps {
  origPrice: string;
  salePrice: string;
  size?: "small" | "medium" | "large";
}

const sizeToVariant: {[key: string]: {newPrice: Variant, oldPrice: Variant}} = {
  small: {
    newPrice: "h5",
    oldPrice: "subtitle2",
  },
  medium: {
    newPrice: "h4",
    oldPrice: "subtitle1",
  },
};

export default function PriceDisplay({
  origPrice,
  salePrice,
  size = "medium",
}: PriceDisplayProps) {
  return (
    <>
      {salePrice ? (
        <Box>
          <Typography
            component={"s"}
            variant={sizeToVariant[size].oldPrice}
            sx={{ color: "#666" }}
          >
            {formatCurrency(parseFloat(origPrice))}
          </Typography>
          <Typography variant={sizeToVariant[size].newPrice} fontWeight={"bold"}>
            {formatCurrency(parseFloat(salePrice))}
          </Typography>
        </Box>
      ) : (
        <Typography variant={sizeToVariant[size].newPrice} fontWeight={"bold"}>
          {formatCurrency(parseFloat(origPrice))}
        </Typography>
      )}
    </>
  );
}

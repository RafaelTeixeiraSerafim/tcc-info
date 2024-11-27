import { Box, Stack, Typography } from "@mui/material";
import { formatCurrency, getSalePercent } from "../utils/helpers";
import { Variant } from "@mui/material/styles/createTypography";

interface PriceDisplayProps {
  origPrice: number;
  salePrice: number;
  size?: "small" | "medium" | "large";
}

const sizeToVariant: {
  [key: string]: { newPrice: Variant; oldPrice: Variant };
} = {
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
            {formatCurrency(origPrice)}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={"0.5rem"}>
            <Typography variant={sizeToVariant[size].newPrice}>
              {formatCurrency(salePrice)}
            </Typography>
            <Typography color={"primary"} height={"fit-content"}>
              {getSalePercent(origPrice, salePrice)}% OFF
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Typography variant={sizeToVariant[size].newPrice}>
          {formatCurrency(origPrice)}
        </Typography>
      )}
    </>
  );
}

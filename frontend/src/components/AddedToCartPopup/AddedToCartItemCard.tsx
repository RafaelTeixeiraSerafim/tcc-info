import { Box, Typography, IconButton, Stack, useTheme } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IOrderItem } from "../../interfaces";
import { formatCurrency } from "../../utils/helpers";

interface AddedToCartItemCardProps {
  cartItem: IOrderItem;
  onDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    cartItemId: number
  ) => void;
}

export default function AddedToCartItemCard({
  cartItem,
  onDelete,
}: AddedToCartItemCardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "35% 65%",
        gap: "0.5rem",
        paddingBottom: "0.75rem",
        borderBottom: "1px solid " + theme.palette.divider,
      }}
    >
      <Box
        component={"img"}
        src={cartItem.product.images[0].url}
        width={"100%"}
      />
      <Stack justifyContent={"space-between"}>
        <Box
          sx={{
            width: "80%",
          }}
        >
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",
              fontWeight: "bold",
            }}
          >
            {cartItem.product.name}
          </Typography>
        </Box>
        <Box>
          <Typography>
            {formatCurrency(
              parseFloat(
                cartItem.product.salePrice || cartItem.product.origPrice
              )
            )}
          </Typography>
          <Typography>Qtde: {cartItem.qty}</Typography>
        </Box>
      </Stack>
      <IconButton
        onClick={(e) => onDelete(e, cartItem.id)}
        sx={{ position: "absolute", right: 0 }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}

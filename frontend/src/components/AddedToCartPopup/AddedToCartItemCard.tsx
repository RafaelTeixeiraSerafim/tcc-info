import { Box, Typography, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IOrderItem } from "../../interfaces";
import { formatCurrency } from "../../utils/helpers";

interface AddedToCartItemCardProps {
  cartItem: IOrderItem;
  onDelete: (cartItemId: number) => void;
}

export default function AddedToCartItemCard({
  cartItem,
  onDelete,
}: AddedToCartItemCardProps) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "35% 65%",
        gap: "0.5rem",
      }}
    >
      <Box
        component={"img"}
        src={cartItem.product.images[0].url}
        width={"100%"}
      />
      <Box>
        <Box
          sx={{
            width: "80%",
            height: "3rem",
            overflow: "scroll",
          }}
        >
          <Typography fontWeight={"bold"}>{cartItem.product.name}</Typography>
        </Box>
        <Typography>
          {formatCurrency(
            parseFloat(cartItem.product.salePrice || cartItem.product.origPrice)
          )}
        </Typography>
        <Typography>Qtde: {cartItem.qty}</Typography>
      </Box>
      <IconButton
        onClick={() => onDelete(cartItem.id)}
        sx={{ position: "absolute", right: 0 }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}

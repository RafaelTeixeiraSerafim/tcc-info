import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton, Typography } from "@mui/material";
import { useCartContext } from "../hooks";
import { IOrderItem } from "../interfaces";
import { formatCurrency } from "../utils/helpers";

interface CartCardProps {
  cartItem: IOrderItem;
}

export default function CartCard({ cartItem }: CartCardProps) {
  const {handleDeleteFromCart} = useCartContext()

  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "25% 75%",
        gap: "1rem",
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
            width: "50%",
            height: "4rem",
            overflow: "hidden",
          }}
        >
          <Typography variant="h5">{cartItem.product.name}</Typography>
        </Box>
        {cartItem.product.salePrice ? (
          <Box>
            <Typography
              component={"s"}
              variant="subtitle2"
              sx={{ color: "#666" }}
            >
              {formatCurrency(parseFloat(cartItem.product.origPrice))}
            </Typography>
            <Typography variant="h5" fontWeight={"bold"}>
              {formatCurrency(parseFloat(cartItem.product.salePrice))}
            </Typography>
          </Box>
        ) : (
          <Typography variant="h5" fontWeight={"bold"}>
            {formatCurrency(parseFloat(cartItem.product.origPrice))}
          </Typography>
        )}
        <Typography>Qtde: {cartItem.qty}</Typography>
      </Box>
      <IconButton
        onClick={() => handleDeleteFromCart(cartItem.id)}
        sx={{ position: "absolute", right: 0 }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}

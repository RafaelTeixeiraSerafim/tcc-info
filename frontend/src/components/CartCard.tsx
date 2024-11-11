import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton, Typography } from "@mui/material";
import { useCartContext } from "../hooks";
import { IOrderItem } from "../interfaces";
import { formatCurrency } from "../utils/helpers";

interface CartCardProps {
  cartItem: IOrderItem;
}

export default function CartCard({ cartItem }: CartCardProps) {
  const { handleDeleteFromCart } = useCartContext();

  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "15% 85%",
        gap: "1rem",
        paddingBottom: "1.5rem",
        borderBottom: "solid 1px #c3c3c3",
      }}
    >
      <Box
        component={"img"}
        src={cartItem.product.images[0].url}
        sx={{
          width: "100%",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "50%",
            maxHeight: "4rem",
            overflow: "hidden",
          }}
        >
          <Typography variant="h5">{cartItem.product.name}</Typography>
        </Box>
        <Box>
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
        </Box>
        <Typography>Qtde: {cartItem.qty}</Typography>
      </Box>
      <IconButton
        onClick={() => handleDeleteFromCart(cartItem.id)}
        sx={{ position: "absolute", right: "1rem", top: "1rem" }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}

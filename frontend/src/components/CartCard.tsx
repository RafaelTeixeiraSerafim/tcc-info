import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useCartContext } from "../hooks";
import { IOrderItem } from "../interfaces";
import { formatCurrency } from "../utils/helpers";
import RouterLink from "./RouterLink";

interface CartCardProps {
  cartItem: IOrderItem;
}

export default function CartCard({ cartItem }: CartCardProps) {
  const { handleDeleteFromCart } = useCartContext();
  const theme = useTheme();

  return (
    <RouterLink to={`/product/${cartItem.product.id}`} style={{color: "inherit"}}>
      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "15% 85%",
          gap: "1rem",
          paddingBottom: "1.5rem",
          borderBottom: "solid 1px " + theme.palette.divider,
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
              width: "90%",
              maxHeight: "4rem",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {cartItem.product.name}
            </Typography>
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
          onClick={(e) => handleDeleteFromCart(e, cartItem.id)}
          sx={{ position: "absolute", right: 0, top: 0 }}
        >
          <DeleteOutlineIcon color="primary" />
        </IconButton>
      </Box>
    </RouterLink>
  );
}

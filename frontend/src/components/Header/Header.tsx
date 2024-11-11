import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
// import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import { useCartContext, useUserContext } from "../../hooks";
import AddedToCartPopup from "../AddedToCartPopup/AddedToCartPopup";
import AddressDisplay from "../AddressDisplay";
import AccountButton from "./AccountButton";
import ProductSearchBar from "./ProductSearchBar";

export default function Header() {
  const { user } = useUserContext();
  const { addedToCart } = useCartContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={(theme) => {
          return {
            bgcolor: theme.palette.background.paper,
          };
        }}
        elevation={1}
      >
        <Toolbar
          sx={{
            display: { xs: "flex" },
            justifyContent: "space-between",
            width: { xs: "95%", md: "90%" },
            margin: "auto",
            paddingInline: { md: 0 },
            paddingBlock: { xs: 0.5, sm: 0 },
          }}
        >
          <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
            <HeaderLogo />
          </Link>
          <ProductSearchBar />
          <AddressDisplay />
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {/* <Link
              to={"/about"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Sobre
            </Link> */}
            {user ? (
              <>
                {/* <IconButton
                  size="large"
                  aria-label="wishlist"
                  color="inherit"
                  href={"/wishlist"}
                >
                  Ícone de notificação
                  <Badge badgeContent={4} color="error">
                </Badge>
                  <FavoriteOutlined />
                </IconButton> */}
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <Link
                    to={"cart"}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <IconButton
                      size="large"
                      aria-label="carrinho"
                      color="inherit"
                    >
                      {/* Ícone de notificação */}
                      {/* <Badge badgeContent={17} color="error">
                </Badge> */}
                      <ShoppingCartOutlined />
                    </IconButton>
                  </Link>
                  {addedToCart && <AddedToCartPopup />}
                </Box>
                <AccountButton />
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Entrar
                </Link>
                <Link
                  to={"/signup"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Cadastre-se
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

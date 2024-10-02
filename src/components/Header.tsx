import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { IProduct } from "../interfaces";
import axiosInstance from "../config/axiosInstance";
import HeaderLogo from "./HeaderLogo";
import SearchBar from "./SearchBar";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import AddedToCartPopup from "./AddedToCartPopup";
import { AccountCircle } from "@mui/icons-material";
import AddressDisplay from "./AddressDisplay";

export default function Header() {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const { user, logoutUser, hasCheckedToken, addedToCart } =
    useContext(UserContext);

  const theme = useTheme();

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/products");
      console.log(response);

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!hasCheckedToken) return;
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [hasCheckedToken, user?.id]);

  useEffect(() => {
    getProducts();
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate(`/user/${user?.username}`);
        }}
        key={"btnProfile"}
      >
        Minha Conta
      </MenuItem>
      , */}
      {user?.role === "ADMIN" && (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate(`/admin`);
          }}
          key={"btnAdmin"}
        >
          Admin
        </MenuItem>
      )}
      {/* <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate(`/settings/profile`);
        }}
        key={"btnConfig"}
      >
        Configurações
      </MenuItem>
      , */}
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logoutUser();
          navigate(`/`);
        }}
        key={"btnLogout"}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: theme.palette.background.paper,
        }}
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
          <SearchBar products={products} />
          <AddressDisplay />
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
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
            {isLoggedIn ? (
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
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {user?.profilePic ? (
                    <Avatar
                      src={user.profilePic}
                      slotProps={{ img: { loading: "lazy" } }}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
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
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user?.profile_picture ? (
                <Avatar
                  src={user.profile_picture}
                  slotProps={{ img: { loading: "lazy" } }}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton> */}
          </Box>

          {/* Mobile Menu */}
          {/* <UserMobileMenu
            handleMobileMenuClose={handleMobileMenuClose}
            handleProfileMenuOpen={handleProfileMenuOpen}
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            setMobileMoreAnchorEl={setMobileMoreAnchorEl}
            user={user}
          /> */}
          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

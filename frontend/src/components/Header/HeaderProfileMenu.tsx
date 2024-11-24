import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks";

interface HeaderProfileMenuProps {
  anchorEl: null | HTMLElement;
  clearAnchor: () => void;
}

export default function HeaderProfileMenu({
  anchorEl,
  clearAnchor,
}: HeaderProfileMenuProps) {
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
  //   useState<null | HTMLElement>(null);

  const { logoutUser } = useUserContext();

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const handleMobileMenuClose = () => {
    clearAnchor();
    // setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    clearAnchor();
    handleMobileMenuClose();
  };

  return (
    <>
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
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate(`/account/profile`);
          }}
          key={"btnProfile"}
        >
          Meu Perfil
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate(`/purchases`);
          }}
          key={"btnPurchases"}
        >
          Compras
        </MenuItem>
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
          Sair
        </MenuItem>
      </Menu>
      {/* Mobile Menu */}
      {/* <UserMobileMenu
            handleMobileMenuClose={handleMobileMenuClose}
            handleProfileMenuOpen={handleProfileMenuOpen}
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            setMobileMoreAnchorEl={setMobileMoreAnchorEl}
            user={user}
          /> */}
    </>
  );
}

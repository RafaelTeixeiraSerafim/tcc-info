import { AccountCircle } from "@mui/icons-material";
import { IconButton, Avatar } from "@mui/material";
import React, { useState } from "react";
import { useUserContext } from "../../hooks";
import HeaderProfileMenu from "./HeaderProfileMenu";

export default function AccountButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { user } = useUserContext();

  const clearAnchor = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
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
      <HeaderProfileMenu anchorEl={anchorEl} clearAnchor={clearAnchor} />
    </>
  );
}

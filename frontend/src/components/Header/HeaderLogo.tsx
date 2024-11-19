import Logo from "../../assets/images/small_logo.png";
import { Box } from "@mui/material";

export default function HeaderLogo() {
  return (
    <Box
      component="img"
      sx={{
        maxWidth: 250,
        maxHeight: 75,
      }}
      alt="logo"
      loading="lazy"
      src={Logo}
    />
  );
}

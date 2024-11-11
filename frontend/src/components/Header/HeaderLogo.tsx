import Logo from "../../assets/images/logo (2).png";
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

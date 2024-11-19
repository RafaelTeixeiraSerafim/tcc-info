import { CSSProperties } from "react";
import LogoImg from "../assets/images/small_logo.png";
import { Box } from "@mui/material";

const sizeToRem: { [key: string]: string } = {
  small: "4rem",
  medium: "6rem",
  large: "8rem",
};

interface LogoProps {
  size?: "small" | "medium" | "large";
  style?: CSSProperties;
}

export default function Logo({ size = "medium", style }: LogoProps) {
  return (
    <Box
      component="img"
      sx={{
        maxWidth: sizeToRem[size],
        ...style,
      }}
      alt="logo"
      loading="lazy"
      src={LogoImg}
    />
  );
}

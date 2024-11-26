import { InputLabel, useTheme } from "@mui/material";
import useProductImageInputContext from "./useProductImageInputContext";

interface ProductInputLabel {
  label: string;
  required?: boolean;
}

export default function ProductInputLabel({
  label,
  required,
}: ProductInputLabel) {
  const { isHovering, setIsHovering } = useProductImageInputContext();
  const theme = useTheme();

  return (
    <InputLabel
      component={"label"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{
        top: "-1rem",
        color: isHovering
          ? `${theme.palette.text.primary} !important`
          : `rgba(${theme.palette.text.secondary} / 0.23) !important`,
      }}
    >
      {label}
      {required && "*"}
    </InputLabel>
  );
}

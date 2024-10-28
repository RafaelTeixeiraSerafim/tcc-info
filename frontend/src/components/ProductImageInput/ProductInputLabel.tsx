import { InputLabel } from "@mui/material";

interface ProductInputLabel {
  label: string;
  required?: boolean;
}

export default function ProductInputLabel({
  label,
  required,
}: ProductInputLabel) {
  return (
    <InputLabel
      sx={{
        position: "absolute",
        top: -40,
        color: "inherit",
      }}
    >
      {label}
      {required && "*"}
    </InputLabel>
  );
}

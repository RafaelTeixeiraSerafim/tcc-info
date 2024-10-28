import { InputLabel } from "@mui/material";

interface ProfileImageLabel {
  label: string;
}

export default function ProfileImageLabel({ label }: ProfileImageLabel) {
  return (
    <InputLabel
      sx={{
        position: "absolute",
        top: -22,
        left: "50%",
        transform: "translateX(-50%)",
        color: "inherit",
      }}
    >
      {label}
    </InputLabel>
  );
}

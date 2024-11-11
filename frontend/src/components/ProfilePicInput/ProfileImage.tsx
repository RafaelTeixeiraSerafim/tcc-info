import { Avatar } from "@mui/material";
import { CSSProperties } from "react";

interface ProfileImageProps {
  previewImage: string | ArrayBuffer;
  style?: CSSProperties;
}

export default function ProfileImage({
  previewImage,
  style,
}: ProfileImageProps) {
  return (
    <Avatar
      src={previewImage as string}
      onError={() => console.log("Erro na profile picture")}
      sx={{
        width: "10rem",
        height: "10rem",
        ...style,
      }}
    />
  );
}

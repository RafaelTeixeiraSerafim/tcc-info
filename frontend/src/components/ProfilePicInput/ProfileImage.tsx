import { Avatar } from "@mui/material";

interface ProfileImageProps {
  previewImage: string | ArrayBuffer;
}

export default function ProfileImage({ previewImage }: ProfileImageProps) {
  return (
    <Avatar
      src={previewImage as string}
      onError={() => console.log("Erro na profile picture")}
      sx={{
        width: "10rem",
        height: "10rem",
      }}
    />
  );
}

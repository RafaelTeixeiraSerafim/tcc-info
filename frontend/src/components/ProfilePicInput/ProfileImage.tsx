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
        width: "8rem",
        height: "8rem",
      }}
    />
  );
}

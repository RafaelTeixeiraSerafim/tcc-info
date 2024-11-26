import { Box } from "@mui/material";

interface ProductImage {
  previewImage: string | ArrayBuffer;
}

export default function ProductImage({ previewImage }: ProductImage) {
  return (
    <Box
      component={"img"}
      src={previewImage as string}
      loading="lazy"
      alt=""
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxHeight: "100%",
        maxWidth: "100%",
      }}
    />
  );
}

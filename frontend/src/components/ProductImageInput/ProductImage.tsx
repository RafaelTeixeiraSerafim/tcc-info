import { Box, useTheme } from "@mui/material";

interface ProductImage {
  previewImage: string | ArrayBuffer;
}

export default function ProductImage({ previewImage }: ProductImage) {
  const theme = useTheme();

  return (
    <Box
      component={"img"}
      src={previewImage as string}
      loading="lazy"
      alt=""
      sx={{
        width: "100%",
        borderRadius: theme.shape.borderRadius,
      }}
    />
  );
}

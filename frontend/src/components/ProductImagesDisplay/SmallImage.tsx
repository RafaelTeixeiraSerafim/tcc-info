import { Box, useTheme } from "@mui/material";
import { IImage } from "../../interfaces";

interface SmallImageProps {
  image: IImage;
  onHoverEnter: (event: React.MouseEvent<HTMLImageElement>) => void;
  onHoverLeave: () => void;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
  hoveredImageId: number | string;
  selectedImageId: number | string;
}

export default function SmallImage({
  image,
  onHoverEnter,
  onHoverLeave,
  onClick,
  hoveredImageId,
  selectedImageId,
}: SmallImageProps) {
  const theme = useTheme();

  return (
    <Box
      component={"img"}
      src={image.url}
      alt=""
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      onClick={onClick}
      data-id={image.id}
      key={image.id}
      width={"100%"}
      sx={{
        cursor: "pointer",
        opacity: hoveredImageId === image.id ? 0.7 : 1,
        boxShadow:
          selectedImageId === image.id
            ? `0 0 0 2px ${theme.palette.primary.main}`
            : "none",
        transition: "opacity 0.3s ease, border 0.3s ease",
        borderRadius: 1,
      }}
    />
  );
}

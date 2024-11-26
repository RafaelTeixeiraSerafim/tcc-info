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
      sx={{
        position: "relative",
        cursor: "pointer",
        opacity: hoveredImageId === image.id ? 0.7 : 1,
        boxShadow:
          selectedImageId === image.id
            ? `0 0 0 2px ${theme.palette.primary.main}`
            : `0 0 0 2px ${theme.palette.grey[300]}`,
        transition: "opacity 0.3s ease, border 0.3s ease",
        borderRadius: 1,
        width: "100%",
        aspectRatio: "1",
      }}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      onClick={onClick}
      data-id={image.id}
    >
      <Box
        component={"img"}
        src={image.url}
        alt=""
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </Box>
  );
}

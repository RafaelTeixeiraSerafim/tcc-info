import { Box } from "@mui/material";
import { useState } from "react";

interface MainImageProps {
  imageUrl: string;
}

export default function MainImage({ imageUrl }: MainImageProps) {
  const [lensStyle, setLensStyle] = useState<React.CSSProperties>({
    visibility: "hidden",
    left: 0,
    top: 0,
  });

  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transformOrigin: "center",
    transform: "scale(1)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Lens position
    const lensX = x - 50; // Adjust based on lens size
    const lensY = y - 50;

    // Image zoom calculation
    const fx = container.offsetWidth / container.clientWidth;
    const fy = container.offsetHeight / container.clientHeight;

    setLensStyle({
      visibility: "visible",
      left: `${lensX}px`,
      top: `${lensY}px`,
    });

    setZoomStyle({
      transformOrigin: `${x * fx}px ${y * fy}px`,
      transform: "scale(2)", // Adjust zoom level
    });
  };

  const handleMouseLeave = () => {
    setLensStyle({ visibility: "hidden", left: 0, top: 0 });
    setZoomStyle({ transform: "scale(1)", transformOrigin: "center" });
  };

  return (
    <Box
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1",
        overflow: "hidden",
      }}
    >
      <img
        src={imageUrl}
        alt=""
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
          maxHeight: "100%",
          maxWidth: "100%",
          ...zoomStyle,
        }}
      />
      <Box sx={lensStyle} />
    </Box>
  );
}

import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IImage } from "../interfaces";

interface ProductImagesDisplay {
  images: IImage[];
}

export default function ProductImagesDisplay({ images }: ProductImagesDisplay) {
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [hoveredImage, setHoveredImage] = useState<IImage | null>(null);
  const theme = useTheme();

  const handleHoverEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    const id = e.currentTarget.dataset["id"]!;

    setHoveredImage(images.find((image) => image.id === parseInt(id)) || null);
  };

  const handleHoverLeave = () => {
    setHoveredImage(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const id = e.currentTarget.dataset["id"]!;

    setSelectedImage(images.find((image) => image.id === parseInt(id))!);
  };

  useEffect(() => {
    if (images && images.length > 0) setSelectedImage(images[0]);
  }, [images[0].id]);

  return (
    <>
      {selectedImage && (
        <Box
          sx={{
            display: "flex",
            gap: "inherit",
            width: "52%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "5rem",
              gap: "0.5rem",
            }}
          >
            {images.map((image) => (
              <Box
                component={"img"}
                src={image.url}
                alt=""
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
                onClick={handleClick}
                data-id={image.id}
                width={"100%"}
                sx={{
                  cursor: "pointer",
                  opacity: hoveredImage?.id === image.id ? 0.7 : 1,
                  boxShadow:
                    selectedImage.id === image.id
                      ? `0 0 0 2px ${theme.palette.primary.main}`
                      : "none",
                  transition: "opacity 0.3s ease, border 0.3s ease",
                  borderRadius: 1,
                }}
              />
            ))}
          </Box>
          <img
            src={hoveredImage?.url || selectedImage.url}
            alt=""
            width={"100%"}
          />
        </Box>
      )}
    </>
  );
}

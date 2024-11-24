import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IImage } from "../../interfaces";
import MainImage from "./MainImage";
import SmallImage from "./SmallImage";

interface ProductImagesDisplay {
  images: IImage[];
}

export default function ProductImagesDisplay({ images }: ProductImagesDisplay) {
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [hoveredImage, setHoveredImage] = useState<IImage | null>(null);

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
    if (images.length > 0) setSelectedImage(images[0]);
  }, [images]);

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
              gap: "1rem",
            }}
          >
            {images.map((image) => (
              <SmallImage
                image={image}
                onClick={handleClick}
                onHoverEnter={handleHoverEnter}
                onHoverLeave={handleHoverLeave}
                hoveredImageId={hoveredImage?.id || 0}
                selectedImageId={selectedImage.id}
                key={image.id}
              />
            ))}
          </Box>
          <MainImage imageUrl={hoveredImage?.url || selectedImage.url || ""} />
        </Box>
      )}
    </>
  );
}

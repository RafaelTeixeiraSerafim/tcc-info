import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ProductImageInput from "./ProductImageInput/ProductImageInput";
import { IFormProduct, IImage } from "../interfaces";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useEffect } from "react";

interface ProductImageInputsProps {
  images: IImage[];
  setFormProduct: React.Dispatch<React.SetStateAction<IFormProduct>>;
  numOfImages: number;
  setNumOfImages: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductImageInputs({
  images,
  setFormProduct,
  numOfImages,
  setNumOfImages,
}: ProductImageInputsProps) {
  const handleAddImg = () => {
    if (numOfImages < 6) {
      if (numOfImages === images.length)
        setFormProduct((prevFormProduct) => {
          return {
            ...prevFormProduct,
            images: [
              ...prevFormProduct.images,
              {
                id: (images.length + 1).toString(),
                file: null,
              },
            ],
          };
        });
      setNumOfImages((prevNum) => prevNum + 1);
    }
  };

  useEffect(() => {
    console.log(images);
  }, [numOfImages, images]);

  const handleSubImg = () => {
    if (numOfImages > 1) setNumOfImages((prevNum) => prevNum - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "left" }}>
          Imagens
        </Typography>
        <Tooltip
          title={
            <>
              <Typography fontSize={"0.75rem"}>
                As imagens que aparecerão na página do produto
              </Typography>
              <br />
              <Typography fontSize={"0.75rem"}>
                A <b>Imagem 1</b> é a imagem principal que aparecerá na maioria dos displays do produto
              </Typography>
            </>
          }
        >
          <HelpOutlineIcon />
        </Tooltip>
        <IconButton onClick={handleAddImg} sx={{ aspectRatio: 1 }}>
          +
        </IconButton>
        <IconButton onClick={handleSubImg} sx={{ aspectRatio: 1 }} size="large">
          -
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: "1.5rem",
          justifyContent: "center",
          width: "100%",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {Array.from({ length: numOfImages }, (_, i) => i).map((index) => {
          const image = images[index] || {};

          return (
            <ProductImageInput
              defaultImage={image.url ? image.url : ""}
              imageId={image.id}
              setFormProduct={setFormProduct}
              key={image.id}
              label={"Imagem " + (index + 1)}
            />
          );
        })}
      </Box>
    </Box>
  );
}

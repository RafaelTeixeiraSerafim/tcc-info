import { Box } from "@mui/material";
import ImageInput from "./ImageInput";
import { IFormProduct, IImage } from "../interfaces";

interface ImageInputsProps {
  images: IImage[];
  setFormProduct: React.Dispatch<React.SetStateAction<IFormProduct>>;
}

export default function ImageInputs({
  images,
  setFormProduct,
}: ImageInputsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        mb: "1rem",
        width: "100%",
      }}
    >
      {[0, 1, 2].map((index) => {
        const image = images[index] || {};

        return (
          <ImageInput
            defaultImage={image.url ? image.url : ""}
            imageId={image.id}
            setFormProduct={setFormProduct}
            key={image.id}
            label={"Imagem " + (index + 1)}
          />
        );
      })}
    </Box>
  );
}

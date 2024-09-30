import React, { memo, useEffect, useState } from "react";
import { IFormProduct } from "../interfaces";
import { alpha, Box, InputLabel, styled } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface ImageInputProps {
  setFormProduct: React.Dispatch<React.SetStateAction<IFormProduct>>;
  imageId: number;
  defaultImage: string;
  label: string;
  required?: boolean;
}

const StyledImageInput = styled(InputLabel)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  marginTop: 20,
  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark" ? alpha("#fff", 0.2) : alpha("#000", 0.2),
  borderRadius: theme.shape.borderRadius,
  display: "inline-block",
  textAlign: "center",
  cursor: "pointer",
  pointerEvents: "auto",
  width: "100%",
  ":hover": {
    borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  },
  ":focus-within": {
    borderColor: theme.palette.primary.main, // Focused border color
  },
}));

const ImageInput = memo(
  ({
    setFormProduct,
    imageId,
    defaultImage,
    label,
    required,
  }: ImageInputProps) => {
    const [previewImage, setPreviewImage] = useState<
      string | ArrayBuffer | null
    >(null);
    const changeBgImage = (imageFile: File | undefined) => {
      if (!imageFile) return;

      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(imageFile);
    };

    const handleChange = (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const target = e.target as HTMLInputElement & {
        files: FileList;
      };

      setFormProduct((prevProduct) => {
        return {
          ...prevProduct,
          images: prevProduct.images.map((image) =>
            image.id === imageId ? { ...image, file: target.files[0] } : image
          ),
        };
      });

      changeBgImage(target.files[0]);
    };

    useEffect(() => setPreviewImage(defaultImage), []);

    console.log("rerender img input");

    return (
      <Box sx={{ display: "flex", flex: 1 }}>
        <StyledImageInput shrink={false} focused={false}>
          <InputLabel
            shrink={false}
            sx={{
              position: "absolute",
              top: -40,
              color: "inherit",
            }}
            focused={false}
          >
            {label}
            {required && "*"}
          </InputLabel>
          {previewImage ? (
            <Box
              component={"img"}
              src={previewImage as string}
              loading="lazy"
              alt=""
              sx={{
                width: "100%",
              }}
            />
          ) : (
            <Box sx={{
              display: "flex",
              minHeight: "7rem",
              height: "100%"
            }}>
              <AddPhotoAlternateIcon fontSize="large" sx={{ margin: "auto"}}/>
            </Box>
          )}
          <input
            id="input"
            type="file"
            hidden
            accept="image/*"
            required={required}
            onChange={handleChange}
          />
        </StyledImageInput>
      </Box>
    );
  }
);

export default ImageInput;

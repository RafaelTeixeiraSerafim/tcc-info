import React, { memo, useState } from "react";
import useImageInputMenu from "../../hooks/useImageInputMenu";
import { IFormProduct } from "../../interfaces";
import ImageInputMenu from "../ImageInputMenu";
import DefaultProductImage from "./DefaultProductImage";
import ProductImage from "./ProductImage";
import ProductImageInputContainer from "./ProductImageInputContainer";
import ProductInputLabel from "./ProductInputLabel";

interface ProductImageInputProps {
  setFormProduct: React.Dispatch<React.SetStateAction<IFormProduct>>;
  imageId: number | string;
  defaultImage: string;
  label: string;
  required?: boolean;
}

const ProductImageInput = memo(
  ({
    setFormProduct,
    imageId,
    defaultImage,
    label,
    required,
  }: ProductImageInputProps) => {
    const [previewImage, setPreviewImage] = useState<
      string | ArrayBuffer | null
    >(defaultImage || null);

    const { handleClose, handleOpen, isOpen, menuPosition, resetMenuPosition } =
      useImageInputMenu();

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
      resetMenuPosition();
    };

    const handlePhotoRemove = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      setFormProduct((prevProduct) => ({
        ...prevProduct!,
        images: prevProduct.images.map((image) =>
          image.id === imageId ? { ...image, file: "", url: "" } : image
        ),
      }));
      setPreviewImage(null);
      resetMenuPosition();
    };

    return (
      <ProductImageInputContainer handleOpen={handleOpen}>
        <ProductInputLabel label={label} required={required} />
        {previewImage ? (
          <ProductImage previewImage={previewImage} />
        ) : (
          <DefaultProductImage />
        )}
        <ImageInputMenu
          isOpen={isOpen}
          menuPosition={menuPosition}
          onChange={handleChange}
          onClose={handleClose}
          onPhotoRemove={handlePhotoRemove}
        />
      </ProductImageInputContainer>
    );
  }
);

export default ProductImageInput;

import React from "react";
import ProductImageInputProvider from "./ProductImageInputProvider";
import ProductImageInputBase from "./ProductImageInputBase";
import { IFormProduct } from "../../interfaces";

interface ProductImageInputProps {
  setFormProduct: React.Dispatch<React.SetStateAction<IFormProduct>>;
  imageId: number | string;
  defaultImage: string;
  label: string;
  required?: boolean;
}

export default function ProductImageInput({
  setFormProduct,
  imageId,
  defaultImage,
  label,
  required,
}: ProductImageInputProps) {
  return (
    <ProductImageInputProvider>
      <ProductImageInputBase
        setFormProduct={setFormProduct}
        imageId={imageId}
        defaultImage={defaultImage}
        label={label}
        required={required}
      />
    </ProductImageInputProvider>
  );
}

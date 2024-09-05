import React, { useEffect, useState } from "react";
import { Product } from "../interfaces";

interface ImageInputProps {
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  productItemId: number;
  imageId: number;
  defaultImage: string | ArrayBuffer | null;
}

export default function ImageInput({
  setProduct,
  productItemId,
  imageId,
  defaultImage,
}: ImageInputProps) {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );

  const changeBgImage = (image: File | undefined) => {
    if (!image) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPreviewImage(reader.result);
      setProduct((prevProduct) => {
        return {
          ...prevProduct,
          productItems: prevProduct.productItems.map((item) =>
            item.id === productItemId
              ? {
                  ...item,
                  images: item.images.map((image) =>
                    image.id === imageId
                      ? { ...image, preview: reader.result }
                      : image
                  ),
                }
              : item
          ),
        };
      });
    };

    reader.readAsDataURL(image);
  };

  const handleFileChange = (
    e: React.FormEvent<HTMLInputElement>,
    productItemId: number,
    imageId: number
  ) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        productItems: prevProduct.productItems.map((item) =>
          item.id === productItemId
            ? {
                ...item,
                images: item.images.map((image) =>
                  image.id === imageId
                    ? { ...image, file: target.files[0] }
                    : image
                ),
              }
            : item
        ),
      };
    });

    changeBgImage(target.files[0]);
  };

  useEffect(() => setPreviewImage(defaultImage), []);

  return (
    <div>
      <input
        type="file"
        onChange={(e) => handleFileChange(e, productItemId, imageId)}
      />
      <img src={previewImage as string} alt="" />
    </div>
  );
}

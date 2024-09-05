import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import WeightTabs from "./WeightTabs";
import { Product } from "../interfaces";
import SelectCategories from "./SelectCategories";
import axiosInstance from "../config/axiosInstance";

export default function ProductForm() {
  const [product, setProduct] = useState<Product>({
    name: "",
    about: "",
    description: "",
    category: "",
    productItems: [
      {
        id: 1,
        origPrice: "",
        salePrice: "",
        stockQty: "",
        weight: "",
        weightUnit: "g",
        images: [
          {
            id: 1,
            file: null,
            preview: null,
          },
          {
            id: 2,
            file: null,
            preview: null,
          },
          {
            id: 3,
            file: null,
            preview: null,
          },
        ],
      },
    ],
  });
  const [numOfVariants, setNumOfVariants] = useState(1);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productDTO.name", product.name);
    formData.append("productDTO.about", product.about);
    formData.append("productDTO.description", product.description);
    formData.append("productDTO.category", product.category as string);
    product.productItems.forEach((item, index) => {
      formData.append(`productItemDTOs[${index}].origPrice`, item.origPrice);
      formData.append(`productItemDTOs[${index}].salePrice`, item.salePrice);
      formData.append(`productItemDTOs[${index}].stockQty`, item.stockQty);
      formData.append(`productItemDTOs[${index}].weight`, item.weight);
      formData.append(`productItemDTOs[${index}].weightUnit`, item.weightUnit);

      item.images.forEach((image, index2) => {
        if (image.file !== null) {
          formData.append(
            `productItemDTOs[${index}].images[${index2}].file`,
            image.file!
          );
        }
      });
    });

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    axiosInstance
      .post("api/v1/product", formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleWeightAndUnitChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      productItems: prevProduct.productItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addAditionalWeightInput = () => {
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        productItems: [
          ...prevProduct.productItems,
          {
            id: numOfVariants + 1,
            origPrice: "",
            salePrice: "",
            stockQty: "",
            weight: "",
            weightUnit: "g",
            images: [
              {
                id: 1,
                file: null,
                preview: null,
              },
              {
                id: 2,
                file: null,
                preview: null,
              },
              {
                id: 3,
                file: null,
                preview: null,
              },
            ],
          },
        ],
      };
    });
  };

  const removeAditionalWeightInput = () => {
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        productItems: prevProduct.productItems.slice(0, -1),
      };
    });
  };

  useEffect(() => {
    if (numOfVariants > product.productItems.length) {
      addAditionalWeightInput();
    } else if (numOfVariants < product.productItems.length) {
      removeAditionalWeightInput();
    }
  }, [numOfVariants]);

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        name="name"
        placeholder="name"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="about"
        placeholder="about"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        required
        onChange={handleChange}
      />
      <SelectCategories setProduct={setProduct} />
      <Box>
        {product.productItems.map((productItem, index) => (
          <div key={index} data-variant-num={index}>
            <input
              type="text"
              name={`weight${index}`}
              placeholder="weight"
              value={productItem.weight}
              onChange={(e) =>
                handleWeightAndUnitChange(index, "weight", e.target.value)
              }
              required={index === 0}
            />
            <select
              name={`unit${index}`}
              value={productItem.weightUnit}
              onChange={(e) =>
                handleWeightAndUnitChange(index, "weightUnit", e.target.value)
              }
            >
              <option value="mg">mg</option>
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ton">ton</option>
            </select>
          </div>
        ))}
      </Box>

      <button type="button" onClick={() => setNumOfVariants(numOfVariants + 1)}>
        Adicionar peso
      </button>
      {/* Button to remove the last input */}
      <button
        type="button"
        onClick={() => setNumOfVariants(Math.max(numOfVariants - 1, 1))}
      >
        Remover peso
      </button>

      <WeightTabs
        productItems={product.productItems}
        setProduct={setProduct}
        data={product}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

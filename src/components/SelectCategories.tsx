import React, { useEffect, useState } from "react";
import { Category, Product } from "../interfaces";
import axiosInstance from "../config/axiosInstance";

interface SelectCategoriesProps {
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export default function SelectCategories({
  setProduct,
}: SelectCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        category: e.target.value,
      };
    });
  };

  useEffect(() => {
    axiosInstance
      .get("api/v1/categories")
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <select name={`category`} onChange={handleChange}>
      <option value="" selected disabled>
        Categoria
      </option>
      {categories.map((category) => (
        <option value={category.id}>{category.name}</option>
      ))}
    </select>
  );
}

import React, { useEffect, useState } from "react";
import { ICategory, IFormProduct } from "../interfaces";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { fetchCategories } from "../service/api";

interface SelectCategoriesProps {
  setFormProduct: React.Dispatch<React.SetStateAction<IFormProduct>>;
  formProduct: IFormProduct;
}

export default function SelectCategories({
  setFormProduct,
  formProduct,
}: SelectCategoriesProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    setFormProduct((prevProduct) => {
      return {
        ...prevProduct,
        categoryId: e.target.value,
      };
    });
  };

  const getCategories = async () => {
    try {
      const categories = await fetchCategories();
      setCategories(categories);
    } catch (error) {
      alert(`Erro ao pegar as categorias: ${error}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <FormControl>
      <InputLabel id="category-select-label" required>
        Categoria
      </InputLabel>
      <Select
        value={formProduct.categoryId}
        label="Categoria"
        labelId="category-select-label"
        onChange={handleChange}
        required
      >
        {categories.map((category) => (
          <MenuItem value={category.id} key={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

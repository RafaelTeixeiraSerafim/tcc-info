import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import { Category, Product } from "../interfaces";
import axiosInstance from "../config/axiosInstance";
import { Box, Button, Typography } from "@mui/material";
import ProductCarousel from "../components/ProductCarousel";

export default function UserHome() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("api/v1/products");
      console.log(response);

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get("api/v1/categories");
      console.log(response);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <>
      <Button href="new-product">Novo Produto</Button>
      {products &&
        categories &&
        categories.map((category) => (
          <ProductCarousel categoryName={category.name} products={products} />
        ))}
    </>
  );
}

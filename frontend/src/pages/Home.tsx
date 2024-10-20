import React, { useEffect, useState } from "react";
import { ICategory, IProduct } from "../interfaces";
import axiosInstance from "../config/axiosInstance";
import ProductCarousel from "../components/ProductCarousel";
import { Box } from "@mui/material";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  // const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get<IProduct[]>("/products");
      console.log(response);

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const getCategories = async () => {
  //   try {
  //     const response = await axiosInstance.get("/categories");
  //     console.log(response);
  //     setCategories(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const filterCategories = (products: IProduct[]) => {
    const set = new Set<number>();
    products.forEach((product) => set.add(product.category.id));

    const ls: ICategory[] = [];
    Array.from(set.values()).forEach((categoryId) => {
      ls.push(
        products.find((product) => product.category.id === categoryId)!.category
      );
    });
    setFilteredCategories(ls);
  };

  useEffect(() => {
    if (products.length === 0) return;
    filterCategories(products);
  }, [products]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "8rem",
        marginBottom: "4rem",
        gap: "4rem",
      }}
    >
      {filteredCategories.map((category) => (
        <ProductCarousel
          categoryName={category.name}
          products={products}
          key={category.id}
        />
      ))}
    </Box>
  );
}

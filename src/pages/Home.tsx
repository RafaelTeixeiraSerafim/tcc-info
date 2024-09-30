import React, { useEffect, useState } from "react";
import { ICategory, IProduct } from "../interfaces";
import axiosInstance from "../config/axiosInstance";
import ProductCarousel from "../components/ProductCarousel";
import { Box } from "@mui/material";

export default function Home() {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  // const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<
    ICategory[] | null
  >(null);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get<IProduct[]>("api/v1/products");
      console.log(response);

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const getCategories = async () => {
  //   try {
  //     const response = await axiosInstance.get("api/v1/categories");
  //     console.log(response);
  //     setCategories(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const filterCategories = () => {
    if (!products) return;
    if (products?.length === 0) return;
    const set = new Set<number>();
    products?.forEach((product) =>
      set.add((product.category as ICategory).id!)
    );
    const ls: ICategory[] = [];
    Array.from(set.values()).forEach((categoryId) => {
      ls.push(
        products.find(
          (product) => (product.category as ICategory).id === categoryId
        )?.category as ICategory
      );
    });
    setFilteredCategories(ls);
  };

  useEffect(() => {
    filterCategories();
  }, [products?.length]);

  useEffect(() => {
    getProducts();
    // getCategories();
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
      {products &&
        filteredCategories &&
        filteredCategories.map((category) => (
          <ProductCarousel
            categoryName={category.name}
            products={products}
            key={category.id}
          />
        ))}
    </Box>
  );
}

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCarousel from "../../components/ProductCarousel";
import axiosInstance from "../../config/axiosInstance";
import { ICategory, IProduct } from "../../interfaces";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
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
        marginBottom: "4rem",
        gap: "4rem",
        marginTop: 0,
      }}
    >
      <img
        src="https://ss-nova.myshopify.com/cdn/shop/files/slider1.png?v=1613786027"
        alt=""
      />
      <Box
        sx={{
          marginInline: "1.5rem",
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
    </Box>
  );
}

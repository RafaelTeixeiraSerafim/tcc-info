import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Banner from "../../assets/images/banner.png";
import ProductCarousel from "../../components/ProductCarousel";
import { ICategory, IProduct } from "../../interfaces";
import { fetchActiveProducts } from "../../service/api";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);

  const getProducts = async () => {
    try {
      const products = await fetchActiveProducts();
      setProducts(products);
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
        src={Banner}
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

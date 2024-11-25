import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../interfaces";
import { fetchActiveProducts } from "../../service/api";
import SearchBar from "../SearchBar";

export default function ProductSearchBar() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const products = await fetchActiveProducts();

      setProducts(products);
    } catch (error) {
      alert(`Erro ao pegar produtos: ${(error as AxiosError).message}`);
    }
  };

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: unknown
  ) => {
    if (newValue && typeof newValue === "object" && "id" in newValue) {
      navigate(`/product/${(newValue as { id: string }).id}`, {
        state: newValue,
      }); // Navigate using the product's id
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <SearchBar
      data={products}
      onChange={handleChange}
      placeholder="O que você procura?"
      dataLabelKey="name"
    />
  );
}

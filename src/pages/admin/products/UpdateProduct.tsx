import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductForm from "../../../components/ProductForm";
import axiosInstance from "../../../config/axiosInstance";
import { IProduct } from "../../../interfaces";

export default function UpdateProduct() {
  const location = useLocation();
  const productState = location.state;

  const [product, setProduct] = useState<IProduct | null>(productState || null);
  const { productId } = useParams();

  const getProduct = () => {
    axiosInstance
      .get(`/api/v1/products/${productId}`)
      .then((response) => {
        console.log(response);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <>{product && <ProductForm origProduct={product} />}</>;
}

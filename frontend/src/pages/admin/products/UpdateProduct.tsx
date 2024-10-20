import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductForm from "../../../components/ProductForm";
import axiosInstance from "../../../config/axiosInstance";
import { IProduct } from "../../../interfaces";

export default function UpdateProduct() {
  const location = useLocation();
  const productState = location.state;

  const [product, setProduct] = useState<IProduct | null>(productState || null);
  const { productId } = useParams();

  const getProduct = (productId: string) => {
    axiosInstance
      .get(`/products/${productId}`)
      .then((response) => {
        console.log(response);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!productId) return;
    getProduct(productId);
  }, [productId]);

  return <>{product && <ProductForm origProduct={product} />}</>;
}

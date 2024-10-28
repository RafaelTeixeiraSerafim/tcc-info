import {
  Box,
  FormControl,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import PriceDisplay from "../components/PriceDisplay";
import ProductImagesDisplay from "../components/ProductImagesDisplay/ProductImagesDisplay";
import SelectProductQty from "../components/SelectProductQty";
import axiosInstance from "../config/axiosInstance";
import { useUserContext } from "../hooks";
import { IBoughtProduct, IProduct } from "../interfaces";
import { fetchProduct } from "../service/api";

export default function ProductDetails() {
  const productState: IProduct = useLocation().state;

  const [product, setProduct] = useState<IProduct | null>(productState || null);
  const [qty, setQty] = useState<number>(1);
  const [boughtProduct, setBoughtProduct] = useState<IBoughtProduct | null>(
    null
  );
  const { productId } = useParams();

  const { user } = useUserContext();

  const getProduct = async (productId: number) => {
    try {
      const product = await fetchProduct(productId);
      setProduct(product);
    } catch (error) {
      alert(`Erro ao pegar o produto: ${(error as AxiosError).message}`);
    }
  };

  const getBoughtProduct = (userId: number, productId: number) => {
    axiosInstance
      .get(`/bought-products?userId=${userId}&&productId=${productId}`)
      .then((response) => {
        console.log(response);
        setBoughtProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleQtyChange = (e: SelectChangeEvent<number>) => {
    setQty(e.target.value as number);
  };

  useEffect(() => {
    if (!productId) return;

    getProduct(parseInt(productId));
  }, [productId]);

  useEffect(() => {
    if (!product || !user) return;
    getBoughtProduct(product.id, user.id);
  }, [product, user]);

  return (
    <>
      {product && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingInline: "3rem",
            gap: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <ProductImagesDisplay images={product.images} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flex: 1,
              }}
            >
              <Typography variant="h4">{product.name}</Typography>
              <PriceDisplay
                salePrice={product.salePrice}
                origPrice={product.origPrice}
              />
              <FormControl
                sx={{
                  display: "flex",
                  gap: "inherit",
                  maxWidth: "15rem",
                }}
              >
                <SelectProductQty
                  qty={qty}
                  onChange={handleQtyChange}
                  stockQty={parseInt(product.stockQty)}
                />
                <AddToCartButton productId={product.id} productQty={qty} />
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Typography
              component={"span"}
              variant="h3"
              sx={{ fontWeight: "bold" }}
            >
              Descrição
            </Typography>
            <hr
              style={{
                color: "#d3d3d3",
                marginBottom: "1.5rem",
                height: 1,
                width: "100%",
              }}
            ></hr>
            <Typography>{product.description}</Typography>
            <Box sx={{ height: "3rem" }} />
          </Box>
        </Box>
      )}
    </>
  );
}

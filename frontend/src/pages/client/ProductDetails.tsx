import { Box, FormControl, SelectChangeEvent, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddToCartButton from "../../components/AddToCartButton";
import PriceDisplay from "../../components/PriceDisplay";
import ProductImagesDisplay from "../../components/ProductImagesDisplay/ProductImagesDisplay";
import { Reviews } from "../../components/Reviews";
import SelectProductQty from "../../components/SelectProductQty";
import { IProduct } from "../../interfaces";
import { fetchProduct } from "../../service/api";
import TitleUnderline from "../../components/TitleUnderline";

export default function ProductDetails() {
  const productState: IProduct = useLocation().state;

  const [product, setProduct] = useState<IProduct | null>(productState || null);
  const [qty, setQty] = useState<number>(1);

  const { productId } = useParams();

  const getProduct = async (productId: number) => {
    try {
      const product = await fetchProduct(productId);
      setProduct(product);
    } catch (error) {
      alert(`Erro ao pegar o produto: ${(error as AxiosError).message}`);
    }
  };

  const handleQtyChange = (e: SelectChangeEvent<number>) => {
    setQty(e.target.value as number);
  };

  useEffect(() => {
    if (!productId) return;

    getProduct(parseInt(productId));
  }, [productId]);

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
            <TitleUnderline />
            <Typography>{product.description}</Typography>
            <Box sx={{ height: "3rem" }} />
          </Box>
          <Reviews productId={product.id} />
        </Box>
      )}
    </>
  );
}

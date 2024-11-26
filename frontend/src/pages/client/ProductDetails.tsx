import {
  Box,
  FormControl,
  Rating,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddToCartButton from "../../components/AddToCartButton";
import PageSubtitle from "../../components/PageSubtitle";
import PriceDisplay from "../../components/PriceDisplay";
import ShippingFeeDisplay from "../../components/Product/ShippingFeeDisplay";
import ProductImagesDisplay from "../../components/ProductImagesDisplay/ProductImagesDisplay";
import { Reviews } from "../../components/Reviews";
import SelectProductQty from "../../components/SelectProductQty";
import { IProduct } from "../../interfaces";
import { fetchProduct } from "../../service/api";
import AddToWishlistButton from "../../components/Wishlist/AddToWishlistButton";

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
            mt: "3rem",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: "2rem",
              gridTemplateColumns: "1fr 0.8fr 0.05fr",
            }}
          >
            <ProductImagesDisplay images={product.images} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
                flex: 1,
              }}
            >
              <Stack gap="0.5rem">
                <Typography
                  component="h1"
                  fontSize="1.875rem"
                  fontWeight={"500"}
                  lineHeight={"1.25"}
                >
                  {product.name}
                </Typography>
                <Stack direction={"row"} gap={"0.25rem"}>
                  <Typography>{product.rating.toFixed(1)}</Typography>
                  <Rating value={product.rating} precision={0.1} readOnly />
                  <Typography>({product.numOfReviews})</Typography>
                </Stack>
              </Stack>
              {product.stockQty ? (
                <>
                  <PriceDisplay
                    salePrice={product.salePrice || ""}
                    origPrice={product.origPrice}
                  />
                  <FormControl
                    sx={{
                      display: "flex",
                      gap: "1rem",
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
                  <ShippingFeeDisplay productId={product.id} qty={qty} />
                </>
              ) : (
                <Stack>
                  <Typography variant="h5">Produto indisponível</Typography>
                  <Typography>
                    Este produto não está disponível no momento...
                  </Typography>
                </Stack>
              )}
            </Box>
            <AddToWishlistButton
              productId={product.id}
              style={{ alignSelf: "start" }}
            />
          </Box>
          <Box>
            <PageSubtitle>Descrição</PageSubtitle>
            <Typography whiteSpace={"pre-wrap"}>
              {product.description}
            </Typography>
            <Box sx={{ height: "3rem" }} />
          </Box>
          <Reviews
            productId={product.id}
            onUpdate={() => getProduct(product.id)}
          />
        </Box>
      )}
    </>
  );
}

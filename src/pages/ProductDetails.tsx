import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IBoughtProduct, IProduct } from "../interfaces";
import ProductImagesDisplay from "../components/ProductImagesDisplay";
import axiosInstance from "../config/axiosInstance";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

export default function ProductDetails() {
  const location = useLocation();
  const productState: IProduct = location.state;

  const [product, setProduct] = useState<IProduct | null>(productState || null);
  const [qty, setQty] = useState<string | number>(1);
  const [boughtProduct, setBoughtProduct] = useState<IBoughtProduct | null>(
    null
  );
  const { productId } = useParams();
  const navigate = useNavigate();

  const { user, setAddedToCart, setHasErrorCart } = useContext(UserContext);

  const getProduct = () => {
    axiosInstance
      .get(`api/v1/products/${productId}`)
      .then((response) => {
        console.log(response);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBuy = () => {
    if (!user) {
      navigate("/login");
    }
    if (!product) return;

    const data = {
      userId: user?.id,
      productId: product?.id,
      qty,
    };

    axiosInstance
      .post("api/v1/order-items", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        setHasErrorCart(true);
      })
      .finally(() => setAddedToCart(true));
  };

  const getBoughtProduct = () => {
    axiosInstance
      .get(
        `api/v1/bought-products?userId=${user?.id}&&productId=${product?.id}`
      )
      .then((response) => {
        console.log(response);
        setBoughtProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleQtyChange = (e: SelectChangeEvent<number>) => {
    setQty(e.target.value);
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (!product?.id || !user?.id) return;
    getBoughtProduct();
  }, [product?.id, user?.id]);

  return (
    <>
      {product && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "7rem",
            paddingInline: "3rem",
            gap: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1.5rem",
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
              <Typography variant="h2">{product.name}</Typography>
              {product.salePrice ? (
                <Box>
                  <Typography
                    component={"s"}
                    variant="subtitle1"
                    sx={{ color: "#666" }}
                  >
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(parseFloat(product.origPrice))}
                  </Typography>
                  <Typography variant="h4" fontWeight={"bold"}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(parseFloat(product.salePrice))}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="h4" fontWeight={"bold"}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(parseFloat(product.origPrice))}
                </Typography>
              )}
              <Box>
                <Typography>Sobre</Typography>
                <Typography>{product.about}</Typography>
              </Box>
              <FormControl
                sx={{
                  display: "flex",
                  gap: "inherit",
                  maxWidth: "15rem",
                }}
              >
                <InputLabel id="qty-select-label">Qtde</InputLabel>
                <Select
                  labelId="qty-select-label"
                  label="Qtde"
                  sx={{
                    display: "inline",
                  }}
                  onChange={handleQtyChange}
                  value={qty as number}
                >
                  {Array.from(
                    { length: parseInt(product.stockQty) },
                    (_, i) => i + 1
                  ).map((qty) => (
                    <MenuItem value={qty}>{qty}</MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  onClick={handleBuy}
                  sx={{
                    display: "inline",
                  }}
                >
                  Comprar
                </Button>
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

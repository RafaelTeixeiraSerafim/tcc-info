import React, { useState } from "react";
import { ICategory, IFormProduct, IProduct } from "../interfaces";
import SelectCategories from "./SelectCategories";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import ImageInput from "./ImageInput";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import PriceInput from "./PriceInput";

interface ProductFormProps {
  origProduct?: IProduct | undefined;
}

export default function ProductForm({ origProduct }: ProductFormProps) {
  const isUpdating = Boolean(origProduct);
  const category = origProduct?.category as ICategory | undefined;
  const [formProduct, setFormProduct] = useState<IFormProduct>({
    name: origProduct?.name || "",
    about: origProduct?.about || "",
    description: origProduct?.description || "",
    categoryId: category?.id?.toString() || "",
    origPrice: origProduct?.origPrice || "",
    salePrice: origProduct?.salePrice || "",
    stockQty:
      origProduct?.stockQty !== null && origProduct?.stockQty !== undefined
        ? origProduct.stockQty
        : "",
    images: origProduct?.images || [
      {
        id: 1,
        file: null,
      },
      {
        id: 2,
        file: null,
      },
      {
        id: 3,
        file: null,
      },
    ],
    createdAt: origProduct?.createdAt || "",
    updatedAt: origProduct?.updatedAt || "",
  });
  const [sale, setSale] = useState(Boolean(formProduct.salePrice));
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", formProduct.name);
    formData.append("about", formProduct.about);
    formData.append("description", formProduct.description);
    formData.append("categoryId", formProduct.categoryId.toString());
    formData.append("origPrice", formProduct.origPrice);
    if (sale) {
      formData.append("salePrice", formProduct.salePrice);
    }
    formData.append("stockQty", formProduct.stockQty);

    formProduct.images.forEach((image, index) => {
      formData.append(`images[${index}].url`, image.url ? image.url : "");
      if (image.file instanceof File) {
        formData.append(`images[${index}].file`, image.file);
      }
    });

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    let url = "api/v1/products";
    let request = axiosInstance.post;

    if (isUpdating) {
      url += `/${origProduct!.id}`;
      request = axiosInstance.put;
    }

    request(url, formData, config)
      .then((response) => {
        console.log(response);
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormProduct({
      ...formProduct,
      [name]: value,
    });
  };

  console.log(formProduct.stockQty);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "50%",
      }}
    >
      <Typography variant="h3" component={"h1"}>
        {isUpdating ? "Alterar produto" : "Criar produto"}
      </Typography>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          type="text"
          name="name"
          label="Nome"
          value={formProduct.name}
          required
          onChange={handleChange}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              textAlign: "left",
            }}
          >
            <SelectCategories
              setFormProduct={setFormProduct}
              formProduct={formProduct}
            />
          </Box>
          <TextField
            type="number"
            name="stockQty"
            label="Qtde em estoque"
            value={formProduct.stockQty}
            required
            onChange={handleChange}
            sx={{
              flex: 1,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <PriceInput
            formProduct={formProduct}
            setFormProduct={setFormProduct}
            label="Preço original"
            name="origPrice"
            required
          />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={sale}
                  onChange={(e) => setSale(e.target.checked)}
                />
              }
              label="Oferta"
            />
            <PriceInput
              formProduct={formProduct}
              setFormProduct={setFormProduct}
              label="Preço de oferta"
              name="salePrice"
              disabled={!sale}
            />
          </Box>
        </Box>
        <TextField
          multiline
          minRows={5}
          name="about"
          label="Sobre"
          value={formProduct.about}
          required
          onChange={handleChange}
        />
        <TextField
          multiline
          minRows={10}
          name="description"
          label="Descrição"
          value={formProduct.description}
          required
          onChange={handleChange}
        />
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {[0, 1, 2].map((index) => {
            const image = formProduct.images[index] || {};

            return (
              <ImageInput
                defaultImage={image.url ? image.url : ""}
                imageId={image.id || index + 1}
                setFormProduct={setFormProduct}
                key={image.id || index + 1}
                label={"Imagem " + image.id}
              />
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            mt: "2rem",
            width: "100%",
            gap: "2rem",
          }}
        >
          <Button
            type="submit"
            variant="outlined"
            onClick={() => navigate("/admin/products")}
            sx={{
              flex: 1,
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              flex: 1,
            }}
          >
            {isUpdating ? "Alterar" : "Criar"}
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}

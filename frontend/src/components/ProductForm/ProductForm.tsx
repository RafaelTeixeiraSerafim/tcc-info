import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { IFormProduct, IProduct } from "../../interfaces";
import { createProduct, updateProduct } from "../../service/api";
import { defaultFormProduct } from "../../utils/formDefaults";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  formatPriceInputForBackend,
  formatPriceInputForFrontend,
} from "../../utils/helpers";
import Form from "../Form";
import PriceInput from "../PriceInput";
import ProductImageInputs from "../ProductImageInputs";
import SelectCategories from "../SelectCategories";
import FormRow from "./FormRow";
import DecimalInput from "../DecimalInput";
import TitleUnderline from "../TitleUnderline";

interface ProductFormProps {
  origProduct?: IProduct;
}

export default function ProductForm({ origProduct }: ProductFormProps) {
  const isUpdating = Boolean(origProduct);

  const [formProduct, setFormProduct] = useState<IFormProduct>(
    origProduct
      ? {
          ...origProduct,
          categoryId: origProduct.category.id.toString(),
          origPrice: formatPriceInputForFrontend(
            origProduct.origPrice.toString()
          ),
          salePrice: formatPriceInputForFrontend(
            origProduct.salePrice.toString()
          ),
        }
      : defaultFormProduct
  );
  const [sale, setSale] = useState(Boolean(formProduct.salePrice));
  const [numOfImages, setNumOfImages] = useState(formProduct.images.length);
  const navigate = useNavigate();

  const { handleTextInputChange } = useForm<IFormProduct>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleTextInputChange(e, setFormProduct);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", formProduct.name);
    formData.append("about", formProduct.about);
    formData.append("description", formProduct.description);
    formData.append("categoryId", formProduct.categoryId.toString());
    formData.append(
      "origPrice",
      formatPriceInputForBackend(formProduct.origPrice.toString())
    );
    if (sale) {
      formData.append(
        "salePrice",
        formatPriceInputForBackend(formProduct.salePrice.toString())
      );
    }
    formData.append("stockQty", formProduct.stockQty);
    formData.append("length", formProduct.length);
    formData.append("width", formProduct.width);
    formData.append("height", formProduct.height);
    formData.append("weight", formProduct.weight);

    for (let i = 0; i < formProduct.images.length; i++) {
      const image = formProduct.images[i];
      if (i + 1 <= numOfImages) {
        if (typeof image.id === "number") {
          formData.append(`images[${i}].id`, image.id.toString());
          formData.append(`images[${i}].url`, image.url ? image.url : "");
        }
        if (image.file instanceof File) {
          formData.append(`images[${i}].file`, image.file);
        }
      } else {
        if (typeof image.id === "number") {
          formData.append(`images[${i}].id`, image.id.toString());
          formData.append(`images[${i}].url`, "");
        }
      }
    }

    try {
      if (isUpdating) await updateProduct(origProduct!.id, formData);
      else await createProduct(formData);

      navigate("/admin/products/");
    } catch (error) {
      alert(
        `Erro ao ${isUpdating ? "alterar" : "criar"} o produto: ${(error as AxiosError).message}`
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "90%", gap: "3rem" }}>
      <Box width={"100%"}>
        <Form.Title>
          {isUpdating ? "Alterar produto" : "Novo produto"}
        </Form.Title>
        <TitleUnderline style={{ marginBottom: "1rem" }} />
      </Box>
      <Stack sx={{ width: "100%" }} gap={"2rem"}>
        <Typography variant="h4" textAlign={"left"}>
          Informações gerais
        </Typography>
        <Stack gap={"1.75rem"}>
          <TextField
            type="text"
            name="name"
            label="Nome"
            value={formProduct.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <FormRow>
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
              name="stockQty"
              label="Qtde. em estoque"
              value={formProduct.stockQty}
              required
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) handleChange(e);
              }}
              sx={{
                flex: 1,
              }}
              // inputProps={{
              //   inputMode: "decimal",
              // }}
            />
          </FormRow>

          <FormRow>
            <PriceInput
              value={formProduct.origPrice}
              onChange={handleChange}
              label="Preço original"
              name="origPrice"
              required
              fullWidth
            />
            <Box
              sx={{
                display: "flex",
                width: "100%",
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
                value={formProduct.salePrice}
                onChange={handleChange}
                label="Preço de oferta"
                name="salePrice"
                disabled={!sale}
                fullWidth
              />
            </Box>
          </FormRow>
          <TextField
            multiline
            minRows={10}
            maxRows={20}
            name="description"
            label="Descrição"
            value={formProduct.description}
            required
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </Stack>

      <Stack sx={{ width: "100%" }} gap={"2rem"}>
        <Stack direction={"row"} alignItems={"center"} gap={"0.5rem"}>
          <Typography variant="h4" textAlign={"left"}>
            Dimensões
          </Typography>
          <Tooltip
            title={
              <>
                <Typography fontSize={"0.75rem"}>
                  As dimensões da <b>caixa</b> em que o produto será
                  transportado
                </Typography>
                <br />
                <Typography fontSize={"0.75rem"}>
                  Elas serão utilizadas para o cálculo do frete do produto
                </Typography>
              </>
            }
          >
            <HelpOutlineIcon />
          </Tooltip>
        </Stack>
        <Stack gap="1.75rem">
          <FormRow>
            <DecimalInput
              name="length"
              label="Comprimento (m)"
              value={formProduct.length}
              onChange={handleChange}
              required
              fullWidth
            />
            <DecimalInput
              name="width"
              label="Largura (m)"
              value={formProduct.width}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormRow>

          <FormRow>
            <DecimalInput
              name="height"
              label="Altura (m)"
              value={formProduct.height}
              required
              onChange={handleChange}
              fullWidth
            />
            <DecimalInput
              name="weight"
              label="Peso (kg)"
              value={formProduct.weight}
              required
              onChange={handleChange}
              fullWidth
            />
          </FormRow>
        </Stack>
      </Stack>

      <ProductImageInputs
        images={formProduct.images}
        setFormProduct={setFormProduct}
        numOfImages={numOfImages}
        setNumOfImages={setNumOfImages}
      />

      <Form.Actions>
        <Form.Action
          variant="outlined"
          handleClick={() => navigate("/admin/products")}
        >
          Cancelar
        </Form.Action>
        <Form.SubmitButton>
          {isUpdating ? "Alterar" : "Criar"}
        </Form.SubmitButton>
      </Form.Actions>
    </Form>
  );
}

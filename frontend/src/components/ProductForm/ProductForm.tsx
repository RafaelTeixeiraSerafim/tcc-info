import React, { useState } from "react";
import { IFormProduct, IProduct } from "../../interfaces";
import SelectCategories from "../SelectCategories";
import { useNavigate } from "react-router-dom";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import PriceInput from "../PriceInput";
import Form from "../Form";
import { defaultFormProduct } from "../../utils/formDefaults";
import useForm from "../../hooks/useForm";
import ImageInputs from "../ImageInputs";
import { createProduct, updateProduct } from "../../service/api";
import {
  formatPriceInputForBackend,
  formatPriceInputForFrontend,
} from "../../utils/helpers";
import { AxiosError } from "axios";
import FormRow from "./FormRow";

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
  const navigate = useNavigate();

  const { handleTextInputChange } = useForm<IFormProduct>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleTextInputChange(e, setFormProduct);

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

    formProduct.images.forEach((image, index) => {
      if (isUpdating) {
        formData.append(`images[${index}].id`, image.id.toString());
        formData.append(`images[${index}].url`, image.url ? image.url : "");
      }
      if (image.file instanceof File) {
        formData.append(`images[${index}].file`, image.file);
      }
    });

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
    <Form handleSubmit={handleSubmit} style={{ width: "70%" }}>
      <Form.Title>
        {isUpdating ? "Alterar produto" : "Criar produto"}
      </Form.Title>
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
      </FormRow>

      <FormRow>
        <PriceInput
          value={formProduct.origPrice}
          setFormProduct={setFormProduct}
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
            setFormProduct={setFormProduct}
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
      <ImageInputs
        images={formProduct.images}
        setFormProduct={setFormProduct}
      />
      <FormRow>
        <TextField
          name="length"
          label="Comprimento"
          value={formProduct.length}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="width"
          label="Largura"
          value={formProduct.width}
          onChange={handleChange}
          required
          fullWidth
        />
      </FormRow>

      <FormRow>
        <TextField
          name="height"
          label="Altura"
          value={formProduct.height}
          required
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="weight"
          label="Peso"
          value={formProduct.weight}
          required
          onChange={handleChange}
          fullWidth
        />
      </FormRow>

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

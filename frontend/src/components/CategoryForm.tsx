import React from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ICategory, IFormCategory } from "../interfaces";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { createCategory, updateCategory } from "../service/api";
import { AxiosError } from "axios";
import TitleUnderline from "./TitleUnderline";

interface CategoryFormProps {
  origCategory?: ICategory;
}

export default function CategoryForm({ origCategory }: CategoryFormProps) {
  const [formCategory, setFormCategory] = useState<IFormCategory>({
    name: origCategory?.name || "",
    description: origCategory?.description || "",
  });
  const { handleTextInputChange } = useForm<IFormCategory>();
  const navigate = useNavigate();

  const isUpdating = Boolean(origCategory);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isUpdating) await updateCategory(origCategory!.id, formCategory);
      else await createCategory(formCategory);

      navigate("/admin/categories");
    } catch (error) {
      alert(
        `Erro ao ${isUpdating ? "alterar" : "criar"} a categoria: ${(error as AxiosError).message}`
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleTextInputChange(e, setFormCategory);

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ width: "90%", gap: "2.5rem", height: "80vh" }}
    >
      <Box width={"100%"}>
        <Form.Title>{isUpdating ? "Alterar" : "Nova"} Categoria</Form.Title>
        <TitleUnderline style={{ marginBottom: "1rem" }} />
      </Box>
      <Stack width="100%" gap={"2rem"}>
        <Typography variant="h4" textAlign={"left"}>
          Informações gerais
        </Typography>
        <TextField
          type="text"
          name="name"
          label={"Nome"}
          value={formCategory.name}
          onChange={handleChange}
          required
          fullWidth
        />
      </Stack>
      {/* <TextField
        multiline
        minRows={4}
        label="Descrição"
        name="description"
        value={formCategory.description}
        onChange={handleChange}
        fullWidth
      /> */}
      <Box flex={1} />
      <Form.Actions>
        <Form.Action
          onClick={() => navigate("/admin/categories")}
          variant="outlined"
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

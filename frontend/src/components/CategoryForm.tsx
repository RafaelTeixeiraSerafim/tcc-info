import { Box, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { ICategory, IFormCategory } from "../interfaces";
import { createCategory, updateCategory } from "../service/api";
import Form from "./Form";
import TitleUnderline from "./TitleUnderline";

interface CategoryFormProps {
  origCategory?: ICategory;
}

const errors = {
  name: [
    {
      message: "Uma categoria com esse nome já existe",
      onError: (error: AxiosError) => error.status === 409,
    },
  ],
};

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
      console.log(error);
      throw error;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleTextInputChange(e, setFormCategory);

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ width: "90%", gap: "2.5rem", height: "80vh" }}
      errors={errors}
    >
      <Box width={"100%"}>
        <Form.Title>{isUpdating ? "Alterar" : "Nova"} Categoria</Form.Title>
        <TitleUnderline style={{ marginBottom: "1rem" }} />
      </Box>
      <Stack width="100%" gap={"2rem"}>
        <Typography variant="h4" textAlign={"left"}>
          Informações gerais
        </Typography>
        <Form.Inputs>
          <Form.Input
            type="text"
            name="name"
            label={"Nome"}
            value={formCategory.name}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
        </Form.Inputs>
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

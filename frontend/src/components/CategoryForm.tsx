import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { ICategory, IFormCategory } from "../interfaces";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { createCategory, updateCategory } from "../service/api";
import { AxiosError } from "axios";

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
    <Form onSubmit={handleSubmit} style={{ width: "60%" }}>
      <Form.Title>{isUpdating ? "Alterar" : "Nova"} Categoria</Form.Title>
      <TextField
        type="text"
        name="name"
        label={"Nome"}
        value={formCategory.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        multiline
        minRows={4}
        label="Descrição"
        name="description"
        value={formCategory.description}
        onChange={handleChange}
        fullWidth
      />
      <Form.Actions>
        <Form.Action
          handleClick={() => navigate("/admin/categories")}
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

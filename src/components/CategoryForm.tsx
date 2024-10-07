import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { ICategory } from "../interfaces";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import SubmitButton from "./SubmitButton";

interface CategoryFormProps {
  origCategory?: ICategory;
}

export default function CategoryForm({ origCategory }: CategoryFormProps) {
  const [formCategory, setFormCategory] = useState<ICategory>({
    name: origCategory?.name || "",
    description: origCategory?.description || "",
  });

  const isUpdating = Boolean(origCategory);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = "/api/v1/categories";
    let request = axiosInstance.post;

    if (isUpdating) {
      url += `/${origCategory!.id}`;
      request = axiosInstance.put;
    }

    request(url, formCategory)
      .then((response) => {
        console.log(response);
        navigate("/admin/categories");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormCategory({
      ...formCategory,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form handleSubmit={handleSubmit} style={{width: "60%"}}>
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
        <SubmitButton>{isUpdating ? "Alterar" : "Criar"}</SubmitButton>
      </Form.Actions>
    </Form>
  );
}

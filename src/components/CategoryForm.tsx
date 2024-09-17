import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ICategory } from "../interfaces";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

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

    let url = "api/v1/categories";
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
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "40%",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component={"h1"}>
        {isUpdating ? "Alterar" : "Nova"} Categoria
      </Typography>
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
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          width: "100%",
        }}
      >
        <Button
          onClick={() => navigate("/admin/categories")}
          variant="outlined"
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
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axiosInstance";
import { ICategory } from "../../../interfaces";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoryTable from "../../../components/CategoryTable";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/categories");
      console.log(response);

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSelectedCategories = async () => {
    try {
      if (!categories) return;
      const response = await axiosInstance.delete(
        "/api/v1/categories/batch-delete",
        {
          data: selectionModel,
        }
      );
      console.log(response);
      setCategories(
        categories.filter((category) => !selectionModel.includes(category.id!))
      );
      alert("Categorias deletadas com sucesso!");
    } catch (error) {
      console.error("Error deleting categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories && (
        <Box
          sx={{
            width: "100%",
            paddingInline: 3,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" component={"h1"}>
              Categorias
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Button
                onClick={deleteSelectedCategories}
                variant="outlined"
                color={"error"}
                disabled={selectionModel.length === 0}
              >
                Deletar
              </Button>
              <Button variant="outlined" onClick={() => navigate("new")}>
                Nova Categoria
              </Button>
            </Box>
          </Box>
          <CategoryTable
            categories={categories}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
          />
        </Box>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { ICategory } from "../../../interfaces";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoryTable from "../../../components/CategoryTable";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { deleteCategories, fetchCategories } from "../../../service/api";
import { AxiosError } from "axios";

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const categories = await fetchCategories();

      setCategories(categories);
    } catch (error) {
      alert(`Erro ao pegar as categorias: ${(error as AxiosError).message}`);
    }
  };

  const deleteSelectedCategories = async () => {
    try {
      await deleteCategories(selectionModel);

      setCategories(
        categories.filter((category) => !selectionModel.includes(category.id))
      );
      alert("Categorias deletadas com sucesso!");
    } catch (error) {
      alert(`Erro ao deletar categorias: ${(error as AxiosError).message}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box
      sx={{
        width: "90%",
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
  );
}

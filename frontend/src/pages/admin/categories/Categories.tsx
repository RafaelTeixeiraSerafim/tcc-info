import { Box, Button, TextField, Typography } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryTable from "../../../components/CategoryTable";
import DeleteCategoriesButton from "../../../components/DeleteCategoriesButton";
import { ICategory } from "../../../interfaces";
import { fetchAllCategories } from "../../../service/api";
import DeactivateCategoriesButton from "../../../components/DeactivateCategoriesButton";
import ReactivateCategoriesButton from "../../../components/ReactivateCategoriesButton";

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const categories = await fetchAllCategories();

      setCategories(categories);
    } catch (error) {
      alert(`Erro ao pegar as categorias: ${(error as AxiosError).message}`);
    }
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
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
        gap: "1rem",
      }}
    >
      <Typography variant="h4" component={"h1"}>
        Categorias
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          placeholder="Pesquisar categorias"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: "40%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <DeleteCategoriesButton
            selectionModel={selectionModel}
            onUpdate={getCategories}
          />
          <DeactivateCategoriesButton
            selectionModel={selectionModel}
            onUpdate={getCategories}
          />
          <ReactivateCategoriesButton
            selectionModel={selectionModel}
            onUpdate={getCategories}
          />
          <Button variant="outlined" onClick={() => navigate("new")}>
            Nova Categoria
          </Button>
        </Box>
      </Box>
      <CategoryTable
        categories={categories}
        searchQuery={searchQuery}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
    </Box>
  );
}

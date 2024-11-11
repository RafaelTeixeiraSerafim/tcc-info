import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IProduct } from "../../../interfaces";
import axiosInstance from "../../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../../components/ProductTable";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      console.log(response);

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSelectedProducts = async () => {
    try {
      if (!products) return;
      const response = await axiosInstance.delete("/products/batch-delete", {
        data: selectionModel,
      });
      console.log(response);
      setProducts(
        products.filter((product) => !selectionModel.includes(product.id))
      );
      alert("Produtos deletados com sucesso!");
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        textAlign: "left",
        gap: "1rem",
      }}
    >
      <Typography variant="h4" component={"h1"}>
        Produtos
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          placeholder="Pesquise pelo nome do produto"
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
          <Button
            onClick={deleteSelectedProducts}
            variant="outlined"
            color={"error"}
            disabled={selectionModel.length === 0}
          >
            Deletar
          </Button>
          <Button variant="outlined" onClick={() => navigate("new")}>
            Novo Produto
          </Button>
        </Box>
      </Box>
      <ProductTable
        products={products}
        searchQuery={searchQuery}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
    </Box>
  );
}

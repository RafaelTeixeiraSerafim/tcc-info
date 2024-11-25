import { Box, Button, TextField, Typography } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProductsButton from "../../../components/DeleteProductsButton";
import ProductTable from "../../../components/ProductTable";
import { IProduct } from "../../../interfaces";
import { fetchAllProducts } from "../../../service/api";
import DeactivateProductsButton from "../../../components/DeactivateProductsButton";
import ReactivateProductsButton from "../../../components/ReactivateProductsButton";

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const products = await fetchAllProducts();

      setProducts(products);
    } catch (error) {
      console.error(error);
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
          placeholder="Pesquisar produtos"
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
          <DeleteProductsButton
            selectionModel={selectionModel}
            onUpdate={getProducts}
          />
          <DeactivateProductsButton
            selectionModel={selectionModel}
            onUpdate={getProducts}
          />
          <ReactivateProductsButton
            selectionModel={selectionModel}
            onUpdate={getProducts}
          />
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

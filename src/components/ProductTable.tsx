import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { IProduct, IProductTableRow } from "../interfaces";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 80 },
  { field: "name", headerName: "Nome", width: 300 },
  { field: "category", headerName: "Categoria", width: 110 },
  { field: "stockQty", headerName: "Qtde. em estoque", width: 140 },
  { field: "origPrice", headerName: "Preço orig.", width: 100 },
  { field: "salePrice", headerName: "Preço oferta", width: 100 },
  { field: "createdAt", headerName: "Criado em", width: 180 },
  { field: "updatedAt", headerName: "Atualizado em", width: 180 },
];

interface ProductTableProps {
  products: IProduct[];
  searchQuery: string;
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

function NoRowsOverlay() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography>Nenhum produto encontrado</Typography>
    </Box>
  );
}

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductTable({
  products,
  searchQuery,
  selectionModel,
  setSelectionModel,
}: ProductTableProps) {
  const [rows, setRows] = useState<IProductTableRow[] | null>(null);
  const navigate = useNavigate();

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  const filteredRows = rows?.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (params: GridRowParams) => {
    const productId = params.row.id;
    const product = products.find((product) => product.id === productId);
    navigate(`${productId}/update`, { state: product });
  };

  useEffect(() => {
    setRows(
      products.map((product) => {
        return {
          id: product.id!,
          name: product.name,
          category:
            typeof product.category === "string"
              ? product.category
              : product.category.name,
          origPrice: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(parseFloat(product.origPrice)),
          salePrice:
            product.salePrice === null
              ? "-"
              : new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(parseFloat(product.salePrice)),
          stockQty: product.stockQty,
          createdAt: new Date(product.createdAt).toLocaleString(),
          updatedAt: new Date(product.updatedAt).toLocaleString(),
        };
      })
    );
  }, [products.length]);

  return (
    <>
      {rows && (
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            onRowClick={(params) => handleRowClick(params)}
            slots={{ noRowsOverlay: NoRowsOverlay }}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            rowSelectionModel={selectionModel}
          />
        </Paper>
      )}
    </>
  );
}

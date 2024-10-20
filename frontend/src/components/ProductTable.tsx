import { Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct, IProductTableRow } from "../interfaces";
import NoRowsOverlay from "./NoRowsOverlay";
import { formatCurrency } from "../utils/helpers";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", flex: 1 },
  { field: "name", headerName: "Nome", flex: 3.5 },
  { field: "category", headerName: "Categoria", flex: 1.7 },
  { field: "stockQty", headerName: "Qtde. em estoque", flex: 1 },
  { field: "origPrice", headerName: "Preço orig.", flex: 1.5 },
  { field: "salePrice", headerName: "Preço oferta", flex: 1.5 },
  { field: "createdAt", headerName: "Criado em", flex: 2.5 },
  { field: "updatedAt", headerName: "Atualizado em", flex: 2.5 },
];

interface ProductTableProps {
  products: IProduct[];
  searchQuery: string;
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

const paginationModel = { page: 0, pageSize: 5 };

const noRowsOverlay = () => (
  <NoRowsOverlay>Nenhum produto encontrado</NoRowsOverlay>
);

export default function ProductTable({
  products,
  searchQuery,
  selectionModel,
  setSelectionModel,
}: ProductTableProps) {
  const [rows, setRows] = useState<IProductTableRow[]>([]);
  const navigate = useNavigate();

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  const filteredRows = rows.filter((row) =>
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
          id: product.id,
          name: product.name,
          category: product.category.name,
          origPrice: formatCurrency(parseFloat(product.origPrice)),
          salePrice:
            product.salePrice === null
              ? "-"
              : formatCurrency(parseFloat(product.salePrice)),
          stockQty: product.stockQty,
          createdAt: new Date(product.createdAt).toLocaleString(),
          updatedAt: new Date(product.updatedAt).toLocaleString(),
        };
      })
    );
  }, [products]);

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0, width: "100%" }}
        onRowClick={(params) => handleRowClick(params)}
        slots={{ noRowsOverlay: noRowsOverlay }}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectionModel}
      />
    </Paper>
  );
}

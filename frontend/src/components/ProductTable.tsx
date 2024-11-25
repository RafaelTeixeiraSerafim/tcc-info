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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", flex: 0.8 },
  { field: "name", headerName: "Nome", flex: 3 },
  { field: "category", headerName: "Categoria", flex: 1.4 },
  { field: "stockQty", headerName: "Estoque", flex: 1 },
  { field: "origPrice", headerName: "Preço orig.", flex: 1.5 },
  { field: "salePrice", headerName: "Preço oferta", flex: 1.5 },
  {
    field: "deactivated",
    headerName: "Ativo",
    flex: 1,
    renderCell: (params) =>
      !params.value ? (
        <Box sx={{ display: "flex", height: "100%", alignItems: "center" }}>
          <CheckIcon color="success" sx={{ justifySelf: "center" }} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", height: "100%", alignItems: "center" }}>
          <CloseIcon color="error" />
        </Box>
      ),
  },
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
          deactivated: product.deactivated,
          createdAt: new Date(product.createdAt).toLocaleString(),
          updatedAt: product.updatedAt
            ? new Date(product.updatedAt).toLocaleString()
            : "-",
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

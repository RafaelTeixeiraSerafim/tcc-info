import React, { useEffect, useState } from "react";
import { ICategory, ICategoryTableRow } from "../interfaces";
import { Box, Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NoRowsOverlay from "./NoRowsOverlay";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface CategoryTableProps {
  categories: ICategory[];
  searchQuery: string;
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", flex: 0.5 },
  { field: "name", headerName: "Nome", flex: 3 },
  // { field: "description", headerName: "Descrição", flex: 7 },
  {
    field: "deactivated",
    headerName: "Ativa",
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
  { field: "createdAt", headerName: "Criado em", flex: 1.5 },
  { field: "updatedAt", headerName: "Atualizado em", flex: 1.5 },
];

const paginationModel = { page: 0, pageSize: 5 };

const noRowsOverlay = () => (
  <NoRowsOverlay>Nenhuma categoria encontrada</NoRowsOverlay>
);

export default function CategoryTable({
  categories,
  searchQuery,
  selectionModel,
  setSelectionModel,
}: CategoryTableProps) {
  const [rows, setRows] = useState<ICategoryTableRow[]>([]);
  const navigate = useNavigate();

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (params: GridRowParams) => {
    const categoryId = params.row.id;
    const category = categories.find((category) => category.id === categoryId);
    navigate(`${categoryId}/update`, { state: category });
  };

  useEffect(() => {
    setRows(
      categories.map((category) => {
        return {
          id: category.id,
          name: category.name,
          description: category.description,
          deactivated: category.deactivated,
          createdAt: new Date(category.createdAt).toLocaleString(),
          updatedAt: category.updatedAt
            ? new Date(category.updatedAt).toLocaleString()
            : "-",
        };
      })
    );
  }, [categories]);

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

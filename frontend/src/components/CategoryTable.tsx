import React, { useEffect, useState } from "react";
import { ICategory, ICategoryTableRow } from "../interfaces";
import { Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NoRowsOverlay from "./NoRowsOverlay";

interface CategoryTableProps {
  categories: ICategory[];
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", flex: 1 },
  { field: "name", headerName: "Nome", flex: 2 },
  { field: "description", headerName: "Descrição", flex: 7 },
];

const paginationModel = { page: 0, pageSize: 5 };

const noRowsOverlay = () => (
  <NoRowsOverlay>Nenhuma categoria encontrada</NoRowsOverlay>
);

export default function CategoryTable({
  categories,
  selectionModel,
  setSelectionModel,
}: CategoryTableProps) {
  const [rows, setRows] = useState<ICategoryTableRow[]>([]);
  const navigate = useNavigate();

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  const handleRowClick = (params: GridRowParams) => {
    const categoryId = params.row.id;
    const category = categories.find((category) => category.id === categoryId);
    navigate(`${categoryId}/update`, { state: category });
  };

  useEffect(() => {
    setRows(categories);
  }, [categories]);

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
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

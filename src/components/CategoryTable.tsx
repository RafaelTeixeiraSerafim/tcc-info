import React, { useEffect, useState } from "react";
import { ICategory, ICategoryTableRow } from "../interfaces";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

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
      <Typography>Nenhuma categoria encontrada</Typography>
    </Box>
  );
}

const paginationModel = { page: 0, pageSize: 5 };

export default function CategoryTable({ categories, selectionModel, setSelectionModel }: CategoryTableProps) {
  const [rows, setRows] = useState<ICategoryTableRow[] | null>(null);
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
    setRows(
      categories.map((category) => {
        return {
          id: category.id!,
          description: category.description,
          name: category.name,
        };
      })
    );
  }, [categories.length]);

  return (
    <>
      {rows && (
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0, width: "100%" }}
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

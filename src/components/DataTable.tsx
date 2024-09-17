import * as React from "react";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

interface DataTableProps {
  rows: GridValidRowModel[];
  columns: GridColDef[];
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
      <Typography>Nenhum usuário encontrado</Typography>
    </Box>
  );
}

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ rows, columns }: DataTableProps) {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        slots={{
          noRowsOverlay: NoRowsOverlay,
        }}
      />
    </Paper>
  );
}

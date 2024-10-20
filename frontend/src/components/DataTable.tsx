import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import NoRowsOverlay from "./NoRowsOverlay";

interface DataTableProps {
  rows: GridValidRowModel[];
  columns: GridColDef[];
}

const noRowsOverlay = () => (
  <NoRowsOverlay>Nenhum usuário encontrado</NoRowsOverlay>
);

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
          noRowsOverlay: noRowsOverlay,
        }}
      />
    </Paper>
  );
}

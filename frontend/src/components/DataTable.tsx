import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import NoRowsOverlay from "./NoRowsOverlay";

interface DataTableProps {
  rows: GridValidRowModel[];
  columns: GridColDef[];
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

const noRowsOverlay = () => (
  <NoRowsOverlay>Nenhum usuário encontrado</NoRowsOverlay>
);

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({
  rows,
  columns,
  selectionModel,
  setSelectionModel,
}: DataTableProps) {
  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  return (
    <Paper sx={{ height: "23.1rem", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        slots={{
          noRowsOverlay: noRowsOverlay,
        }}
        onRowSelectionModelChange={handleSelectionChange}
        checkboxSelection
        rowSelectionModel={selectionModel}
      />
    </Paper>
  );
}

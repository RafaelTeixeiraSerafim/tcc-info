import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { IAccountTableRow, IUser } from "../interfaces";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", flex: 1 },
  { field: "username", headerName: "Nome de usuário", flex: 4 },
  { field: "email", headerName: "Email", flex: 6 },
  {
    field: "enabled",
    headerName: "Ativo",
    flex: 2,

    renderCell: (params) =>
      params.value ? (
        <Box sx={{ display: "flex", height: "100%", alignItems: "center" }}>
          <CheckIcon color="success" sx={{ justifySelf: "center" }} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", height: "100%", alignItems: "center" }}>
          <CloseIcon color="error" />
        </Box>
      ),
  },
  { field: "createdAt", headerName: "Criado em", flex: 4 },
  { field: "updatedAt", headerName: "Atualizado em", flex: 4 },
];

interface ClientTableProps {
  clients: IUser[];
  searchQuery: string;
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

export default function ClientTable({
  clients,
  searchQuery,
  selectionModel,
  setSelectionModel,
}: ClientTableProps) {
  const [rows, setRows] = useState<IAccountTableRow[]>([]);

  const filteredRows = rows.filter((row) =>
    row.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setRows(
      clients.map((user: IUser) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          enabled: user.enabled,
          createdAt: new Date(user.createdAt).toLocaleString(),
          updatedAt: user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "-",
        };
      })
    );
  }, [clients]);

  return (
    <DataTable
      rows={filteredRows}
      columns={columns}
      selectionModel={selectionModel}
      setSelectionModel={setSelectionModel}
    />
  );
}

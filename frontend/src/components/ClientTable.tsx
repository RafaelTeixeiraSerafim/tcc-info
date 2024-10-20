import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { IAccountTableRow, IUser } from "../interfaces";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", flex: 1 },
  { field: "username", headerName: "Nome de usuário", flex: 4 },
  { field: "email", headerName: "Email", flex: 6 },
  { field: "role", headerName: "Cargo", flex: 2 },
  { field: "createdAt", headerName: "Criado em", flex: 5 },
  { field: "updatedAt", headerName: "Atualizado em", flex: 5 },
];

interface ClientTableProps {
  clients: IUser[];
}

export default function ClientTable({ clients }: ClientTableProps) {
  const [rows, setRows] = useState<IAccountTableRow[]>([]);

  useEffect(() => {
    setRows(
      clients.map((user: IUser) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: new Date(user.createdAt).toLocaleString(),
          updatedAt: new Date(user.updatedAt).toLocaleString(),
        };
      })
    );
  }, [clients]);

  return <DataTable rows={rows} columns={columns} />;
}

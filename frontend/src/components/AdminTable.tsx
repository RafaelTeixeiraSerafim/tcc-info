import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { IAccountTableRow, IUser } from "../interfaces";
import DataTable from "./DataTable";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", flex: 1 },
  { field: "username", headerName: "Nome de usuário", flex: 4 },
  { field: "email", headerName: "Email", flex: 6 },
  { field: "role", headerName: "Cargo", flex: 2 },
  { field: "createdAt", headerName: "Criado em", flex: 4 },
  { field: "updatedAt", headerName: "Atualizado em", flex: 4 },
];

interface AdminTableProps {
  admins: IUser[];
}

export default function AdminTable({ admins }: AdminTableProps) {
  const [rows, setRows] = useState<IAccountTableRow[]>([]);

  useEffect(() => {
    setRows(
      admins.map((user: IUser) => {
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
  }, [admins]);

  return <DataTable rows={rows} columns={columns} />;
}

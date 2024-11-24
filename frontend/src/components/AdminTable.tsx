import React, { useEffect, useState } from "react";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { IAccountTableRow, IUser } from "../interfaces";
import DataTable from "./DataTable";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", flex: 1 },
  { field: "username", headerName: "Nome de usuário", flex: 4 },
  { field: "email", headerName: "Email", flex: 6 },
  { field: "createdAt", headerName: "Criado em", flex: 3.5 },
  { field: "updatedAt", headerName: "Atualizado em", flex: 3.5 },
];

interface AdminTableProps {
  admins: IUser[];
  searchQuery: string;
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

export default function AdminTable({
  admins,
  searchQuery,
  selectionModel,
  setSelectionModel,
}: AdminTableProps) {
  const [rows, setRows] = useState<IAccountTableRow[]>([]);

  const filteredRows = rows.filter((row) =>
    row.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setRows(
      admins.map((user: IUser) => {
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
  }, [admins]);

  return (
    <DataTable
      rows={filteredRows}
      columns={columns}
      selectionModel={selectionModel}
      setSelectionModel={setSelectionModel}
    />
  );
}

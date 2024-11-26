import { Chip, Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAdminNotificationTableRow, INotification } from "../../interfaces";
import { formatDatetime } from "../../utils/helpers";
import { severityMap } from "../../utils/maps";
import NoRowsOverlay from "../NoRowsOverlay";

const columns: GridColDef[] = [
  {
    field: "description",
    headerName: "Descrição",
    flex: 4,
  },
  {
    field: "severity",
    headerName: "Severidade",
    flex: 1,
    renderCell: (params) => (
      <Chip
        color={severityMap[params.value].color}
        variant="outlined"
        label={severityMap[params.value].label}
        icon={severityMap[params.value].icon}
      />
    ),
  },
  { field: "createdAt", headerName: "Data", flex: 1 },
];

interface NotificationTableProps {
  notifications: INotification[];
  searchQuery: string;
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

const paginationModel = { page: 0, pageSize: 5 };

const noRowsOverlay = () => (
  <NoRowsOverlay>Nenhuma notificação encontrada</NoRowsOverlay>
);

export default function NotificationTable({
  notifications,
  searchQuery,
  selectionModel,
  setSelectionModel,
}: NotificationTableProps) {
  const [rows, setRows] = useState<IAdminNotificationTableRow[]>([]);
  const navigate = useNavigate();

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  const filteredRows = rows.filter((row) =>
    row.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (params: GridRowParams) => {
    const productId = params.row.product.id;
    const product = params.row.product;
    navigate(`/admin/products/${productId}/update`, { state: product });
  };

  useEffect(() => {
    setRows(
      notifications.map((notification) => {
        return {
          id: notification.id,
          product: notification.product,
          description: notification.description,
          severity: notification.severity,
          createdAt: formatDatetime(notification.createdAt),
        };
      })
    );
  }, [notifications]);

  return (
    <Paper sx={{ height: "23.1rem", width: "100%" }}>
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

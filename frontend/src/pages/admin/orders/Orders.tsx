import React, { useEffect, useState } from "react";
import { IOrder, IOrderTableRow } from "../../../interfaces";
import axiosInstance from "../../../config/axiosInstance";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { translateStatus } from "../../../utils/helpers";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "status", headerName: "Status", flex: 3 },
  { field: "userEmail", headerName: "Email do Usuário", flex: 6 },
  {
    field: "datePlaced",
    headerName: "Data do pedido",
    type: "dateTime",
    flex: 5,
  },
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
      <Typography>Nenhum pedido encontrado</Typography>
    </Box>
  );
}

const paginationModel = { page: 0, pageSize: 5 };

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [rows, setRows] = useState<IOrderTableRow[] | null>(null);

  const navigate = useNavigate();

  const getOrders = () => {
    axiosInstance
      .get("/orders")
      .then((response) => {
        console.log(response);
        setOrders(response.data);
        setRows(
          response.data.map((order: IOrder) => {
            return {
              id: order.id,
              status: translateStatus(order.status),
              userEmail: order.user.email,
              datePlaced: new Date(order.datePlaced),
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRowClick = (params: GridRowParams) => {
    const orderId = params.row.id;
    const order = orders?.find((order) => order.id === orderId);
    navigate(`${orderId}`, { state: order });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "90%",
        textAlign: "left",
      }}
    >
      <Typography variant="h4" component={"h1"}>
        Pedidos
      </Typography>
      {rows && (
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            rowSelection={false}
            onRowClick={(params) => handleRowClick(params)}
            slots={{ noRowsOverlay: NoRowsOverlay }}
          />
        </Paper>
      )}
    </Box>
  );
}

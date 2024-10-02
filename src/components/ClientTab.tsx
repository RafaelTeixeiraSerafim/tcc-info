import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IUser } from "../interfaces";
import { Box } from "@mui/material";
import ClientTable from "./ClientTable";

export default function ClientTab() {
  const [clients, setClients] = useState<IUser[] | null>(null);

  const getClients = () => {
    axiosInstance
      .get("/api/v1/users/clients")
      .then((response) => {
        console.log(response);
        setClients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      {clients && (
        <Box sx={{ textAlign: "left" }}>
          <ClientTable clients={clients} />
        </Box>
      )}
    </>
  );
}

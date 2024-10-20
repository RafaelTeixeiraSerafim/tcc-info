import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IUser } from "../interfaces";
import { Box } from "@mui/material";
import ClientTable from "./ClientTable";

export default function ClientTab() {
  const [clients, setClients] = useState<IUser[]>([]);

  const getClients = () => {
    axiosInstance
      .get("/users/clients")
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
    <Box sx={{ textAlign: "left" }}>
      <ClientTable clients={clients} />
    </Box>
  );
}

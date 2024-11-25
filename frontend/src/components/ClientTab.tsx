import { Box, TextField } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IUser } from "../interfaces";
import ClientTable from "./ClientTable";
import DisableClientsButton from "./DisableClientsButton";
import EnableClientsButton from "./EnableClientsButton";

export default function ClientTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [clients, setClients] = useState<IUser[]>([]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
  };

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TextField
          placeholder="Pesquisar usuários"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: "40%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <DisableClientsButton
            selectionModel={selectionModel}
            onUpdate={getClients}
          />
          <EnableClientsButton
            selectionModel={selectionModel}
            onUpdate={getClients}
          />
        </Box>
      </Box>

      <ClientTable
        clients={clients}
        searchQuery={searchQuery}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
    </Box>
  );
}

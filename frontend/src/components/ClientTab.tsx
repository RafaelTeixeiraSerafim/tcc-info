import { Box, Button, TextField } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IUser } from "../interfaces";
import ClientTable from "./ClientTable";
import { AxiosError } from "axios";

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

  const disableClients = async (ids: number[]) => {
    try {
      const response = await axiosInstance.patch(`/auth/disable`, ids);
      console.log(response);
      getClients();
    } catch (error) {
      alert(`Erro ao desabilitar usuários: ${(error as AxiosError).message}`);
    }
  };

  const enableClients = async (ids: number[]) => {
    try {
      const response = await axiosInstance.patch(`/auth/enable`, ids);
      console.log(response);
      getClients();
    } catch (error) {
      alert(`Erro ao habilitar usuários: ${(error as AxiosError).message}`);
    }
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
          <Button
            onClick={() => disableClients(selectionModel as number[])}
            variant="outlined"
            color={"error"}
            disabled={selectionModel.length === 0}
          >
            Desabilitar usuários
          </Button>
          <Button
            onClick={() => enableClients(selectionModel as number[])}
            variant="outlined"
            color={"success"}
            disabled={selectionModel.length === 0}
          >
            Habilitar usuários
          </Button>
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

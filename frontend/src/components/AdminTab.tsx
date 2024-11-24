import { useEffect, useState } from "react";
import { IUser } from "../interfaces";
import { Box, Button, TextField } from "@mui/material";
import NewAdminModal from "./NewAdminModal";
import AdminTable from "./AdminTable";
import { fetchAdmins } from "../service/api";
import { AxiosError } from "axios";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import axiosInstance from "../config/axiosInstance";

export default function AdminTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [admins, setAdmins] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const deleteAdmins = async (ids: number[]) => {
    try {
      if (ids.length === admins.length) return;

      const response = await axiosInstance.patch(`/auth/delete`, ids);
      console.log(response);
      getAdmins();
    } catch (error) {
      alert(`Erro ao deletar usuários: ${(error as AxiosError).message}`);
    }
  };

  const getAdmins = async () => {
    try {
      const admins = await fetchAdmins();
      setAdmins(admins);
    } catch (error) {
      alert(`Erro pegando os admins: ${(error as AxiosError).message}`);
    }
  };

  useEffect(() => {
    getAdmins();
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
            onClick={() => setIsModalOpen(true)}
            variant="outlined"
            color={"secondary"}
          >
            Novo admin
          </Button>
          <Button
            onClick={() => deleteAdmins(selectionModel as number[])}
            variant="outlined"
            color={"error"}
            disabled={selectionModel.length === 0}
          >
            Deletar admins
          </Button>
        </Box>
      </Box>

      <AdminTable
        admins={admins}
        searchQuery={searchQuery}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
      <NewAdminModal
        isOpen={isModalOpen}
        onUpdate={getAdmins}
        setIsOpen={setIsModalOpen}
      />
    </Box>
  );
}

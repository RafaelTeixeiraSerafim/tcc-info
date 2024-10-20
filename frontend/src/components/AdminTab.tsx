import { useEffect, useState } from "react";
import { IUser } from "../interfaces";
import { Box, Button } from "@mui/material";
import NewAdminModal from "./NewAdminModal";
import AdminTable from "./AdminTable";
import { fetchAdmins } from "../service/api";
import { AxiosError } from "axios";

export default function AdminTab() {
  const [admins, setAdmins] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Button onClick={() => setIsModalOpen(true)} variant={"outlined"}>
        Novo Admin
      </Button>
      <AdminTable admins={admins} />
      <NewAdminModal
        isOpen={isModalOpen}
        onUpdate={getAdmins}
        setIsOpen={setIsModalOpen}
      />
    </Box>
  );
}

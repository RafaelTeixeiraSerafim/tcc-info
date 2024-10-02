import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IUser } from "../interfaces";
import { Box, Button } from "@mui/material";
import NewAdminModal from "./NewAdminModal";
import AdminTable from "./AdminTable";

export default function AdminTab() {
  const [admins, setAdmins] = useState<IUser[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAdmins = () => {
    axiosInstance
      .get("/api/v1/users/admins")
      .then((response) => {
        console.log(response);
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <>
      {admins && (
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
            getAdmins={getAdmins}
            setIsOpen={setIsModalOpen}
          />
        </Box>
      )}
    </>
  );
}

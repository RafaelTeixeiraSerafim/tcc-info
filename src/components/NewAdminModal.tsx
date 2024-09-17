import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";

interface NewAdminModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getAdmins: () => void;
}

export default function NewAdminModal({
  isOpen,
  setIsOpen,
  getAdmins,
}: NewAdminModalProps) {
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  const handleClose = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .post("api/v1/auth/signup", admin)
      .then((response) => {
        console.log(response);
        getAdmins();
        setIsOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component={"form"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
        onSubmit={handleSubmit}
      >
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: "70%",
            marginInline: "auto",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component={"h1"}>
            Novo Admin
          </Typography>
          <TextField
            label="Nome de usuário"
            name="username"
            value={admin.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            fullWidth
          />
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Button
              onClick={handleCancel}
              variant="outlined"
              sx={{
                flex: 1,
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                flex: 1,
              }}
            >
              Criar
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
}

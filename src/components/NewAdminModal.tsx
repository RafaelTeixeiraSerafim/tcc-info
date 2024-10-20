import { TextField } from "@mui/material";
import React, { useState } from "react";
import Form from "./Form";
import Modal from "./Modal";
import { ISignupUser } from "../interfaces";
import { AxiosError } from "axios";
import { createUser } from "../service/api";

interface NewAdminModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void;
}

export default function NewAdminModal({
  isOpen,
  setIsOpen,
  onUpdate,
}: NewAdminModalProps) {
  const [admin, setAdmin] = useState<ISignupUser>({
    username: "",
    email: "",
    password: "",
  });

  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUser(admin, "ADMIN");
      onUpdate();
      setIsOpen(false);
    } catch (error) {
      alert(`Erro ao criar novo usuário: ${(error as AxiosError).message}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <Form handleSubmit={handleSubmit}>
        <Form.Title variant="h4">Novo Admin</Form.Title>
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
        <Form.Actions>
          <Modal.CancelButton />
          <Form.SubmitButton>Criar</Form.SubmitButton>
        </Form.Actions>
      </Form>
    </Modal>
  );
}

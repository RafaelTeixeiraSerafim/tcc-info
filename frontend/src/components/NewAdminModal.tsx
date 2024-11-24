import { AxiosError } from "axios";
import React, { useState } from "react";
import { ISignupUser } from "../interfaces";
import { createAdmin } from "../service/api";
import Form from "./Form";
import Modal from "./Modal";

interface NewAdminModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void;
}

const errors = {
  email: [
    {
      message: "Esse email já está em uso",
      onError: (e: AxiosError) => e.status === 409,
    },
  ],
  password: [
    {
      message: "A senha deve conter pelo menos 8 caracteres",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => e.target.value.length < 8,
    },
    {
      message: "A senha deve conter pelo menos 8 caracteres",
      onSubmit: (value: string) => value.length < 8,
    },
  ],
};

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
      await createAdmin(admin);
      onUpdate();
      setIsOpen(false);
      setAdmin({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <Form
        onSubmit={handleSubmit}
        errors={errors}
        style={{ width: "80%", gap: "3rem" }}
      >
        <Form.Title variant="h4">Novo Admin</Form.Title>
        <Form.Inputs>
          <Form.Input
            label="Nome de usuário"
            name="username"
            value={admin.username}
            onChange={handleChange}
            fullWidth
            required
          />
          <Form.Input
            label="Email"
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <Form.Input
            label="Senha"
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            fullWidth
            required
          />
        </Form.Inputs>
        <Form.Actions>
          <Modal.CancelButton />
          <Form.SubmitButton>Criar</Form.SubmitButton>
        </Form.Actions>
      </Form>
    </Modal>
  );
}

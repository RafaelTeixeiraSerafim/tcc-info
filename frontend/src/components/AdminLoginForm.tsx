import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import { useUserContext } from "../hooks";
import { ILoginUser } from "../interfaces";
import useForm from "../hooks/useForm";
import { AxiosError } from "axios";
import Form from "./Form";

const errors = {
  root: [
    {
      message: "Email e/ou senha inválidos",
      onError: (error: AxiosError) => error.status === 401,
    },
  ],
};

export default function AdminLoginForm() {
  const [loginUser, setLoginUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });

  const { setUser } = useUserContext();
  const { handleTextInputChange } = useForm<ILoginUser>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login/admin", loginUser);
      console.log(response);
      setUser(response.data);
      navigate("dashboard");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleTextInputChange(e, setLoginUser);

  return (
    <Form onSubmit={handleSubmit} errors={errors} style={{ gap: "3rem" }}>
      <Form.Title>Admin</Form.Title>
      <Form.Inputs>
        <Form.Input
          type="email"
          placeholder="Email"
          name="email"
          value={loginUser.email}
          onChange={handleChange}
          required
        />
        <Form.Input
          type="password"
          placeholder="Senha"
          name="password"
          value={loginUser.password}
          onChange={handleChange}
          required
        />
      </Form.Inputs>
      <Form.Actions>
        <Form.SubmitButton>Entrar</Form.SubmitButton>
      </Form.Actions>
    </Form>
  );
}

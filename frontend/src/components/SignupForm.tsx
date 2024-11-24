import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks";
import useForm from "../hooks/useForm";
import { ISignupUser } from "../interfaces";
import { signup } from "../service/api";
import Form from "./Form";
import LoginPrompt from "./LoginPrompt";

const errors = {
  email: [
    {
      message: "Esse email já está em uso",
      onError: (e: AxiosError) => e.status === 409,
    },
  ],
  password: [
    {
      message: "Sua senha deve conter pelo menos 8 caracteres",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => e.target.value.length < 8,
    },
  ],
};

export default function SignupForm() {
  const [signupUser, setSignupUser] = useState<ISignupUser>({
    username: "",
    email: "",
    password: "",
  });

  const { setUser } = useUserContext();
  const { handleTextInputChange } = useForm<ISignupUser>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await signup(signupUser, "CLIENT");
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleTextInputChange(e, setSignupUser);

  const areInputsFilled = () => {
    return signupUser.email && signupUser.password && signupUser.username;
  };

  return (
    <Form onSubmit={handleSubmit} errors={errors} style={{ gap: "3rem" }}>
      <Form.Title>Signup</Form.Title>
      <Form.Inputs>
        <Form.Input
          type="text"
          placeholder="Nome de usuário"
          name="username"
          value={signupUser.username}
          onChange={handleChange}
          required
        />
        <Form.Input
          type="email"
          placeholder="Email"
          name="email"
          value={signupUser.email}
          onChange={handleChange}
          required
        />
        <Form.Input
          type="password"
          placeholder="Senha"
          name="password"
          value={signupUser.password}
          onChange={handleChange}
          required
        />
      </Form.Inputs>
      <Form.Actions style={{ flexDirection: "column", alignItems: "center" }}>
        <Form.SubmitButton disabled={!areInputsFilled()}>
          Cadastrar
        </Form.SubmitButton>
        <LoginPrompt />
      </Form.Actions>
    </Form>
  );
}

import React, { useState } from "react";
import AuthForm from "./AuthForm";
import LoginPrompt from "./LoginPrompt";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks";
import { ISignupUser } from "../interfaces";
import useForm from "../hooks/useForm";
import { createUser } from "../service/api";
import { AxiosError } from "axios";

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
      const user = await createUser(signupUser, "CLIENT");
      setUser(user);
      navigate("/");
    } catch (error) {
      alert(`Erro ao criar conta: ${(error as AxiosError).message}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleTextInputChange(e, setSignupUser);

  return (
    <AuthForm onSubmit={handleSubmit}>
      <AuthForm.Title>Signup</AuthForm.Title>
      <AuthForm.Content>
        <AuthForm.Input
          type="text"
          placeholder="Nome de usuário"
          name="username"
          value={signupUser.username}
          onChange={handleChange}
          required
        />
        <AuthForm.Input
          type="email"
          placeholder="Email"
          name="email"
          value={signupUser.email}
          onChange={handleChange}
          required
        />
        <AuthForm.Input
          type="password"
          placeholder="Senha"
          name="password"
          value={signupUser.password}
          onChange={handleChange}
          required
        />
      </AuthForm.Content>
      <AuthForm.Actions>
        <AuthForm.SubmitButton>Cadastrar</AuthForm.SubmitButton>
        <LoginPrompt />
      </AuthForm.Actions>
    </AuthForm>
  );
}

import SignupPrompt from "./SignupPrompt";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { useUserContext } from "../hooks";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import { ILoginUser } from "../interfaces";
import useForm from "../hooks/useForm";

export default function LoginForm() {
  const [loginUser, setLoginUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });

  const { setUser } = useUserContext();
  const { handleTextInputChange } = useForm<ILoginUser>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginUser)

    axiosInstance
      .post("/auth/login/client", loginUser)
      .then((response) => {
        console.log(response);
        setUser(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleTextInputChange(e, setLoginUser);

  return (
    <AuthForm onSubmit={handleSubmit}>
      <AuthForm.Title>Login</AuthForm.Title>
      <AuthForm.Content>
        <AuthForm.Input
          type="email"
          placeholder="Email"
          name="email"
          value={loginUser.email}
          onChange={handleChange}
          required
        />
        <AuthForm.Input
          type="password"
          placeholder="Senha"
          name="password"
          value={loginUser.password}
          onChange={handleChange}
          required
        />
      </AuthForm.Content>
      <AuthForm.Actions>
        <AuthForm.SubmitButton>Entrar</AuthForm.SubmitButton>
        <SignupPrompt />
      </AuthForm.Actions>
    </AuthForm>
  );
}

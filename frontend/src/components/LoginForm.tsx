import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import { useUserContext } from "../hooks";
import useForm from "../hooks/useForm";
import { ILoginUser } from "../interfaces";
import Form from "./Form";
import SignupPrompt from "./SignupPrompt";
import DisabledUserLoginDialog from "./Dialogs/DisabledUserLoginDialog";

const errors = {
  root: [
    {
      message: "Email e/ou senha inválidos",
      onError: (error: AxiosError) => error.status === 401,
    },
  ],
};

export default function LoginForm() {
  const [loginUser, setLoginUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { setUser } = useUserContext();
  const { handleTextInputChange } = useForm<ILoginUser>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginUser);

    try {
      const response = await axiosInstance.post(
        "/auth/login/client",
        loginUser
      );
      console.log(response);
      setUser(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      if ((error as AxiosError).status === 403) {
        setIsDialogOpen(true);
      }
      throw error;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleTextInputChange(e, setLoginUser);

  const areInputsFilled = () => {
    return loginUser.email && loginUser.password;
  };

  return (
    <Form onSubmit={handleSubmit} errors={errors} style={{ gap: "3rem" }}>
      <Form.Title>Login</Form.Title>
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
      <Form.Actions style={{ flexDirection: "column", alignItems: "center" }}>
        <Form.SubmitButton disabled={!areInputsFilled()}>
          Entrar
        </Form.SubmitButton>
        <SignupPrompt />
      </Form.Actions>
      <DisabledUserLoginDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </Form>
  );
}

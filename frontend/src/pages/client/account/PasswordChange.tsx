import { Box, Breadcrumbs, Link, TextField, Typography } from "@mui/material";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import Form from "../../../components/Form";
import { useForm, useUserContext } from "../../../hooks";
import { useState } from "react";
import { IPasswordForm } from "../../../interfaces";
import axiosInstance from "../../../config/axiosInstance";
import { AxiosError } from "axios";

export default function PasswordChange() {
  const [form, setForm] = useState<IPasswordForm>({
    curPassword: "",
    newPassword: "",
  });
  const { handleTextInputChange } = useForm<IPasswordForm>();
  const { user } = useUserContext();
  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleTextInputChange(e, setForm);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    userId: number
  ) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.patch(
        `/users/${userId}/password`,
        form
      );
      console.log(response);
      alert("Senha alterada com sucesso")
      navigate("/account/settings/privacy")
    } catch (error) {
      console.error(error);
      alert(`Erro ao alterar senha: ${(error as AxiosError).message}`);
    }
  };

  return (
    <>
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            padding: "2rem",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Configurações</Typography>
            <Link
              underline="hover"
              color="inherit"
              to="/account/settings/privacy"
              component={ReactRouterLink}
            >
              Privacidade e Segurança
            </Link>
            <Typography sx={{ color: "text.primary" }}>
              Alterar Senha
            </Typography>
          </Breadcrumbs>
          <Form
            onSubmit={(e) => handleSubmit(e, user.id)}
            style={{ alignItems: "start" }}
          >
            <TextField
              label="Senha atual"
              name="curPassword"
              value={form.curPassword}
              onChange={handleChange}
              type="password"
              required
            />
            <TextField
              label="Senha nova"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              type="password"
              required
            />
            <Form.Actions>
              <Form.SubmitButton>Alterar</Form.SubmitButton>
            </Form.Actions>
          </Form>
        </Box>
      )}
    </>
  );
}

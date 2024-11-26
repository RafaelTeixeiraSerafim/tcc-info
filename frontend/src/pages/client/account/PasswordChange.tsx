import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import Form from "../../../components/Form";
import axiosInstance from "../../../config/axiosInstance";
import { useForm, useUserContext } from "../../../hooks";
import { IPasswordForm } from "../../../interfaces";

const errors = {
  curPassword: [
    {
      message: "Senha inválida",
      onError: (error: AxiosError) => error.status === 401,
    },
  ],
  newPassword: [
    {
      message: "Sua senha deve conter pelo menos 8 caracteres",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => e.target.value.length < 8,
    },
  ],
};

export default function PasswordChange() {
  const [form, setForm] = useState<IPasswordForm>({
    curPassword: "",
    newPassword: "",
  });
  const { handleTextInputChange } = useForm<IPasswordForm>();
  const { user, newAlert } = useUserContext();
  const navigate = useNavigate();

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
      newAlert("Senha alterada com sucesso!");
      navigate("/account/settings/privacy");
    } catch (error) {
      console.error(error);
      throw error;
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
            errors={errors}
          >
            <Form.Inputs style={{ width: "40%" }}>
              <Form.Input
                label="Senha atual"
                name="curPassword"
                value={form.curPassword}
                onChange={handleChange}
                type="password"
                required
                variant="outlined"
              />
              <Form.Input
                label="Senha nova"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                type="password"
                required
                variant="outlined"
              />
            </Form.Inputs>
            <Form.Actions>
              <Form.CancelButton onClick={() => navigate(-1)}>
                Cancelar
              </Form.CancelButton>
              <Form.SubmitButton>Alterar</Form.SubmitButton>
            </Form.Actions>
          </Form>
        </Box>
      )}
    </>
  );
}

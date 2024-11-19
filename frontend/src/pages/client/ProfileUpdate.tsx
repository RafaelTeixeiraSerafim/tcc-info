import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import ProfilePicInput from "../../components/ProfilePicInput";
import { useUserContext } from "../../hooks";
import { IUpdateUser } from "../../interfaces";
import { updateUser } from "../../service/api";

export default function ProfileUpdate() {
  const { user, setUser } = useUserContext();
  const [formUpdateUser, setFormUpdateUser] = useState<IUpdateUser>({
    username: user?.username || "",
    email: user?.email || "",
    profilePic: {
      file: null,
      url: user?.profilePic,
    },
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormUpdateUser({ ...formUpdateUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", formUpdateUser.username);
    formData.append("email", formUpdateUser.email);

    if (user?.profilePic)
      formData.append(
        "profilePic.url",
        formUpdateUser.profilePic.url ? formUpdateUser.profilePic.url : ""
      );

    if (formUpdateUser.profilePic.file instanceof File)
      formData.append("profilePic.file", formUpdateUser.profilePic.file);

    try {
      const user = await updateUser(formData);
      setUser(user);
      navigate(-1);
    } catch (error) {
      alert(`Erro ao atualizar o usuário: ${(error as AxiosError).message}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        mb: "3rem",
        mt: "3rem",
        width: "80%",
        marginInline: "auto",
      }}
    >
      {user && (
        <>
          <Typography component="h1" variant="h4">
            Alterar Perfil
          </Typography>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
              minHeight: "60vh",
              padding: "4rem",
            }}
          >
            <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
              <Stack direction={"row"} gap={"3rem"} sx={{alignItems: "center"}}>
                <ProfilePicInput
                  defaultImage={user.profilePic}
                  name="profilePic"
                  setUser={setFormUpdateUser}
                  size="11rem"
                />
                <Stack sx={{ gap: "1rem" }}>
                  <TextField
                    label="Nome de Usuário"
                    name="username"
                    value={formUpdateUser.username}
                    onChange={handleChange}
                  />
                  <TextField
                    type="email"
                    label="Email"
                    name="email"
                    value={formUpdateUser.email}
                    onChange={handleChange}
                  />
                </Stack>
              </Stack>
              <Box flex={1} />
              <Form.SubmitButton style={{ flex: 0 }}>Alterar</Form.SubmitButton>
            </Form>
          </Paper>
        </>
      )}
    </Box>
  );
}

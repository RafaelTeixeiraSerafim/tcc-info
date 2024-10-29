import { Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import ProfilePicInput from "../components/ProfilePicInput";
import { useUserContext } from "../hooks";
import { IUpdateUser } from "../interfaces";
import Form from "../components/Form";
import { AxiosError } from "axios";
import { updateUser } from "../service/api";
import { useNavigate } from "react-router-dom";

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
    <>
      {user && (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            mb: "3rem",
            width: "60%",
            minHeight: "60vh",
            marginInline: "auto",
            paddingBlock: "2.5rem",
            paddingInline: "2rem",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Title>Alterar Perfil</Form.Title>
            <ProfilePicInput
              label="Perfil"
              defaultImage={user.profilePic}
              name="profilePic"
              setUser={setFormUpdateUser}
            />
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
            <Form.SubmitButton>Alterar</Form.SubmitButton>
          </Form>
        </Paper>
      )}
    </>
  );
}

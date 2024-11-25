import { Box, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/Form";
import ProfilePicInput from "../../../components/ProfilePicInput";
import { useUserContext } from "../../../hooks";
import { IUpdateUser } from "../../../interfaces";
import { updateUser } from "../../../service/api";

const errors = {
  email: [
    {
      message: "Esse email já está em uso",
      onError: (e: AxiosError) => e.status === 409,
    },
  ],
};

export default function AdminProfileUpdate() {
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
            width: "90%",
            textAlign: "left",
            gap: "3rem",
          }}
        >
          <Typography variant="h4" component={"h1"}>
            Alterar conta
          </Typography>
          <Form
            onSubmit={handleSubmit}
            style={{
              height: "fit-content",
              gap: "inherit",
              alignItems: "start",
              width: "60%",
            }}
            errors={errors}
          >
            <Stack
              direction={"row"}
              gap={"3rem"}
              sx={{ alignItems: "center", width: "100%" }}
            >
              <ProfilePicInput
                defaultImage={user.profilePic}
                name="profilePic"
                setUser={setFormUpdateUser}
                size="11rem"
              />
              <Stack sx={{ gap: "1rem", flex: 1 }}>
                <Form.Input
                  label="Nome de Usuário"
                  name="username"
                  value={formUpdateUser.username}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
                <Form.Input
                  type="email"
                  label="Email"
                  name="email"
                  value={formUpdateUser.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Stack>
            </Stack>
            <Form.Actions style={{ justifyContent: "start" }}>
              <Form.Action onClick={() => navigate(-1)} variant="outlined">
                Cancelar
              </Form.Action>
              <Form.SubmitButton>Alterar</Form.SubmitButton>
            </Form.Actions>
          </Form>
        </Box>
      )}
    </>
  );
}

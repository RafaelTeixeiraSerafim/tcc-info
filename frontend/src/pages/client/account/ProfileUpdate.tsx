import {
  Box,
  Breadcrumbs,
  Link,
  Stack,
  Typography
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
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
      console.error(error);
      throw error;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
        width: "100%",
        padding: "2rem",
        marginInline: "auto",
      }}
    >
      {user && (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/account/profile"
              component={ReactRouterLink}
            >
              Meu Perfil
            </Link>
            <Typography sx={{ color: "text.primary" }}>Alterar</Typography>
          </Breadcrumbs>
          <Form
            onSubmit={handleSubmit}
            style={{ alignItems: "", height: "fit-content", gap: "inherit" }}
            errors={errors}
          >
            <Stack direction={"row"} gap={"3rem"} sx={{ alignItems: "center" }}>
              <ProfilePicInput
                defaultImage={user.profilePic}
                name="profilePic"
                setUser={setFormUpdateUser}
                size="11rem"
              />
              <Stack sx={{ gap: "1rem" }}>
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
            <Form.SubmitButton style={{ flex: 0 }}>Alterar</Form.SubmitButton>
          </Form>
        </>
      )}
    </Box>
  );
}

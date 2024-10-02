import React, { useContext, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

export default function Signup() {
  const [signupUser, setSignupUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .post("/api/v1/auth/signup", signupUser)
      .then((response) => {
        console.log(response);
        setUser(response.data);
        navigate(response.data.role === "USER" ? "/" : "/admin");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupUser((prevUser) => {
      return {
        ...prevUser,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Paper
      component={"form"}
      onSubmit={handleSubmit}
      style={{
        marginTop: "8rem",
        marginInline: "auto",
        width: "30%",
        paddingBlock: "2rem",
        paddingInline: "1.5rem",
      }}
      elevation={5}
    >
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <Typography component={"h1"} variant="h2">
          Signup
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            width: "100%",
          }}
        >
          <TextField
            type="text"
            placeholder="Nome de usuário"
            name="username"
            value={signupUser.username}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
          <TextField
            type="email"
            placeholder="Email"
            name="email"
            value={signupUser.email}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
          <TextField
            type="password"
            placeholder="Senha"
            name="password"
            value={signupUser.password}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
          <Typography>
            Já possui uma conta?{" "}
            <Link
              to={"/login"}
              style={{
                textDecoration: "none",
                color: theme.palette.secondary.dark,
              }}
            >
              Entrar
            </Link>
          </Typography>
        </Box>
      </FormControl>
    </Paper>
  );
}

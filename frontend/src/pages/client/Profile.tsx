import { Box, Button, Paper, Typography } from "@mui/material";
import ProfileImage from "../../components/ProfilePicInput/ProfileImage";
import { useUserContext } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        mb: "3rem",
        width: "80%",
        marginInline: "auto",
      }}
    >
      <Typography component="h1" variant="h4">
        Meu Perfil
      </Typography>
      {user && (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            minHeight: "60vh",
            padding: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            <ProfileImage previewImage={user.profilePic} />
            <Box>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="h6">{user.email}</Typography>
            </Box>
          </Box>
          <Box flex={1} />
          <Button variant="outlined" onClick={() => navigate("update")}>
            Alterar Perfil
          </Button>
        </Paper>
      )}
    </Box>
  );
}

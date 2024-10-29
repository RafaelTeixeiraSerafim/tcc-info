import { Box, Button, Paper, Typography } from "@mui/material";
import ProfileImage from "../components/ProfilePicInput/ProfileImage";
import { useUserContext } from "../hooks";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useUserContext();
  const navigate = useNavigate();

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
          <Box sx={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "center"
          }}>
            <ProfileImage previewImage={user.profilePic} />
            <Box>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="h6">{user.email}</Typography>
            </Box>
          </Box>
          <Box flex={1}/>
          <Button variant="outlined" onClick={() => navigate("update")}>Alterar Perfil</Button>
        </Paper>
      )}
    </>
  );
}

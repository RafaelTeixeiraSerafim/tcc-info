import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../../components/ProfilePicInput/ProfileImage";
import { useUserContext } from "../../../hooks";

export default function Profile() {
  const { user } = useUserContext();
  const navigate = useNavigate();

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
            <Typography sx={{ color: "text.primary" }}>Meu Perfil</Typography>
          </Breadcrumbs>
          <Box
            sx={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            <ProfileImage previewImage={user.profilePic} />
            <Box>
              <Typography variant="h4">{user.username}</Typography>
              <Typography variant="h6">{user.email}</Typography>
            </Box>
          </Box>
          <Box flex={1} />
          <Button variant="outlined" onClick={() => navigate("update")}>
            Alterar Perfil
          </Button>
        </Box>
      )}
    </>
  );
}

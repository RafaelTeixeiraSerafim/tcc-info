import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../../components/ProfilePicInput/ProfileImage";
import { useUserContext } from "../../../hooks";

export default function AdminProfile() {
  const { user } = useUserContext();
  const navigate = useNavigate();

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
            Minha conta
          </Typography>
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
          <Button variant="outlined" onClick={() => navigate("update")} style={{alignSelf: "start"}}>
            Alterar Perfil
          </Button>
        </Box>
      )}
    </>
  );
}

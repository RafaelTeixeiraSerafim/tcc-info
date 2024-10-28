import { Box, Button, Typography } from "@mui/material";
import ProfileImage from "../components/ProfilePicInput/ProfileImage";
import { useUserContext } from "../hooks";
import { useNavigate } from "react-router-dom";

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
            paddingInline: "3rem",
            gap: "3rem",
          }}
        >
          <ProfileImage previewImage={user.profilePic} />
          <Typography>{user.username}</Typography>
          <Typography>{user.email}</Typography>
          <Button onClick={() => navigate("update")}>Alterar Perfil</Button>
        </Box>
      )}
    </>
  );
}

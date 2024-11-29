import { Box, Paper, Typography } from "@mui/material";
import SettingsDrawer from "../components/SettingsDrawer";
import { Outlet } from "react-router-dom";

export default function ClientAccountLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        mb: "3rem",
        mt: "2.4rem",
        width: "80%",
        marginInline: "auto",
      }}
    >
      <Typography component="h1" variant="h4">
        Minha conta
      </Typography>
      <Paper
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "25% 75%",
        }}
      >
        <SettingsDrawer />
        <Outlet />
      </Paper>
    </Box>
  );
}

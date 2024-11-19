import { Box, Typography } from "@mui/material";
import { PieChart } from "../../components/Chart";
import LineChart from "../../components/Chart/LineChart";
import DashboardNotificationDisplay from "../../components/Notification/DashboardNotificationDisplay";

export default function AdminDashboard() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Typography variant="h3">Painel de Vendas</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
          minHeight: "22rem",
        }}
      >
        <Box width={"65%"}>
          <LineChart />
        </Box>
        <DashboardNotificationDisplay style={{ width: "25%" }} />
      </Box>
      <Box sx={{ width: "40%" }}>
        <PieChart />
      </Box>
    </Box>
  );
}

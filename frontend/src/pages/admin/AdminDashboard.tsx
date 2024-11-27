import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "../../components/Chart";
import LineChart from "../../components/Chart/LineChart";
import DashboardNotificationDisplay from "../../components/Notification/DashboardNotificationDisplay";
import BarChart from "../../components/BarChart";

export default function AdminDashboard() {
  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      <Typography variant="h3">Painel de Vendas</Typography>
      <Stack gap="3rem">
        <Box
          sx={{
            display: "flex",
            gap: "3rem",
            width: "100%",
            minHeight: "22rem",
          }}
        >
          <Box width={"65%"}>
            <BarChart />
          </Box>
          <DashboardNotificationDisplay style={{ width: "35%" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            height: "21rem",
          }}
        >
          <Box width="57%">
            <LineChart />
          </Box>
          <Stack width={"43%"} alignItems={"center"}>
            <PieChart />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

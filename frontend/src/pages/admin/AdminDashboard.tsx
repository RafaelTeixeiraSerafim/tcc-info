import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "../../components/Chart";
import LineChart from "../../components/Chart/LineChart";
import DashboardNotificationDisplay from "../../components/Notification/DashboardNotificationDisplay";

export default function AdminDashboard() {
  return (
    <Box
      sx={{
        width: "80%",
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
            justifyContent: "space-between",
            gap: "2rem",
            width: "100%",
            minHeight: "16rem",
          }}
        >
          <Box sx={{ width: "45%" }}>
            <PieChart />
          </Box>
          <DashboardNotificationDisplay style={{ width: "40%" }} />
        </Box>
        <Box width={"100%"}>
          <LineChart style={{height: "26rem"}}/>
        </Box>
      </Stack>
    </Box>
  );
}

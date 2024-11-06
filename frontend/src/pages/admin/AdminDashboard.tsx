import { Box, Typography } from "@mui/material";
import { PieChart } from "../../components/Chart";
import LineChart from "../../components/Chart/LineChart";

export default function AdminDashboard() {
  return (
    <Box
      sx={{
        width: "90%",
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
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            flex: 2,
          }}
        >
          <LineChart />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <PieChart />
        </Box>
      </Box>
    </Box>
  );
}

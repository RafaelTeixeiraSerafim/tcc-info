import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";

const LABELS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Register components for Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  style?: CSSProperties;
}

const LineChart = ({ style }: LineChartProps) => {
  const [sales, setSales] = useState([]);
  const theme = useTheme();

  // Data for the chart
  const data = {
    labels: LABELS,
    datasets: [
      {
        label: "Vendas em 2024 (R$)",
        data: sales,
        fill: false,
        borderColor: theme.palette.primary.main,
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    const getMonthlySales = async () => {
      const response = await axiosInstance.get("/orders/sales");
      console.log(response);
      setSales(response.data);
    };

    getMonthlySales();
  }, []);

  return (
    <Line
      style={style}
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Vendas Mensais",
            font: {
              size: 16
            }
          },
        },
      }}
    />
  );
};

export default LineChart;

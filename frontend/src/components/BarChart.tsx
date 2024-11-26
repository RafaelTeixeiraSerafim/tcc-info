import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IProduct } from "../interfaces";
import { fetchActiveProducts } from "../service/api";
import { useTheme } from "@mui/material";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const theme = useTheme();

  const smallestStockProducts = products
    .sort((a, b) => parseInt(a.stockQty) - parseInt(b.stockQty))
    .slice(0, 10);

  const getProducts = async () => {
    try {
      const products = await fetchActiveProducts();

      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Data for the chart
  const data: ChartData<"bar", (number | [number, number] | null)[], unknown> =
    {
      labels: smallestStockProducts.map((product) => product.name),
      datasets: [
        {
          label: "Estoque",
          data: smallestStockProducts.map((product) =>
            parseInt(product.stockQty)
          ),
          // backgroundColor: "rgba(75, 192, 192, 0.6)",
          backgroundColor: theme.palette.secondary.main,
          // borderColor: "rgba(75, 192, 192, 1)",
          borderColor: theme.palette.secondary.main,
          borderWidth: 1,
        },
      ],
    };

  return (
    <Bar
      data={data}
      plugins={[ChartDataLabels]}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Produtos com menor estoque",
            font: {
              size: 16,
            },
          },
          datalabels: {
            color: "white",
            anchor: "start", // Place the label at the end of the bar
            align: "start", // Align the label at the start of the bar
            formatter: (_, context) => {
              const productName: string = context.chart.data.labels?.[
                context.dataIndex
              ] as string;
              const maxChars = 18; // Define max length for truncation
              return productName.length > maxChars
                ? `${productName.slice(0, maxChars)}...`
                : productName;
            },
            font: {
              weight: "bold",
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true, // Ensure the x-axis starts at 0
          },
          y: {
            ticks: {
              // Set labels on the y-axis to appear below the bars
              display: false, // Align labels horizontally to the left
            },
            afterFit: (axis) => {
              axis.paddingLeft = 130; // Add padding to the left for custom labels
            },
          },
        },
      }}
    />
  );
};

export default BarChart;

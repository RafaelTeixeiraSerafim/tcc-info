import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CSSProperties, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axiosInstance from "../../config/axiosInstance";
import { IProduct } from "../../interfaces";
import { AxiosError } from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IMostBoughtProduct {
  product: IProduct;
  qty: number;
}

interface PieChartProps {
  style?: CSSProperties;
}

const PieChart = ({ style }: PieChartProps) => {
  const [mostBoughtProducts, setMostBoughtProducts] = useState<
    IMostBoughtProduct[]
  >([]);

  const filteredData = mostBoughtProducts.map(
    (boughtProduct) => boughtProduct.qty
  );

  const labels = mostBoughtProducts.map(
    (boughtProduct) => boughtProduct.product.name
  );

  useEffect(() => {
    const getMostBoughtProducts = async () => {
      try {
        const response = await axiosInstance.get(
          "/bought-products/most-bought"
        );
        console.log(response);
        setMostBoughtProducts(response.data.mostBoughtProducts);
      } catch (error) {
        alert(`Erro ao pegar produtos: ${(error as AxiosError).message}`);
      }
    };

    getMostBoughtProducts();
  }, []);

  return (
    <Pie
      style={style}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Produtos mais vendidos",
            font: {
              size: 16
            }
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: "Qtde vendida",
            data: filteredData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};

export default PieChart;

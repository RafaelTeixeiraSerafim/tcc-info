import { Box, Typography } from "@mui/material";
import { useAddressContext } from "../../hooks";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import ShippingOptionsModal from "./ShippingOptionsModal";
import { IShippingOption, IShippingOptions } from "../../interfaces";
import axiosInstance from "../../config/axiosInstance";
import { AxiosError } from "axios";

interface ShippingFeeDisplayProps {
  productId: number;
  qty: number;
}

export default function ShippingFeeDisplay({
  productId,
  qty,
}: ShippingFeeDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productShippingOptions, setProductShippingOptions] = useState<
    IShippingOption[]
  >([]);
  const [productShippingOption, setProductShippingOption] =
    useState<IShippingOption>();

  const { postalCode } = useAddressContext();

  useEffect(() => {
    const getShippingOptions = async (
      postalCode: string,
      productId: number,
      qty: number
    ) => {
      try {
        const response = await axiosInstance.get<IShippingOptions>(
          `/shipping/calculate?postalCode=${postalCode}&productId=${productId}&qty=${qty}`
        );
        console.log(response);
        const shippingOptions = response.data.options;
        setProductShippingOptions(shippingOptions);

        if (shippingOptions.length > 0) {
          let tempOption = {
            id: 0,
            name: "",
            price: Number.MAX_SAFE_INTEGER.toString(),
            deliveryMinDays: 0,
            deliveryMaxDays: 0,
          };

          shippingOptions.map((option) => {
            if (parseFloat(option.price) < parseFloat(tempOption.price))
              tempOption = option;
          });

          setProductShippingOption(tempOption);
        }
      } catch (error) {
        alert(`Erro ao calcular o frete: ${(error as AxiosError).message}`);
      }
    };

    if (!postalCode) return;
    getShippingOptions(postalCode, productId, qty);
  }, [postalCode, productId, qty]);

  return (
    <>
      {productShippingOption && (
        <Box>
          <Typography>
            Frete: {formatCurrency(parseFloat(productShippingOption.price))}
          </Typography>
          <Box
            component="div"
            onClick={() => setIsModalOpen(true)}
            sx={{ cursor: "pointer", width: "fit-content" }}
          >
            <Typography color="secondary">Ver opções</Typography>
          </Box>
          <ShippingOptionsModal
            data={productShippingOptions}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Box>
      )}
    </>
  );
}

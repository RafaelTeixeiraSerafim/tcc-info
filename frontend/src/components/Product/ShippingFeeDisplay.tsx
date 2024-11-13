import { Box, Typography } from "@mui/material";
import { useAddressContext } from "../../hooks";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import ShippingOptionsModal from "./ShippingOptionsModal";

export default function ShippingFeeDisplay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedShippingOption } = useAddressContext();

  return (
    <>
      {selectedShippingOption && (
        <Box>
          <Typography>
            Frete: {formatCurrency(parseFloat(selectedShippingOption.price))}
          </Typography>
          <Box
            component="div"
            onClick={() => setIsModalOpen(true)}
            sx={{ cursor: "pointer", width: "fit-content" }}
          >
            <Typography color="secondary">Ver opções</Typography>
          </Box>
          <ShippingOptionsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Box>
      )}
    </>
  );
}

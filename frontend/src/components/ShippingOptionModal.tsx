// import { Box } from "@mui/material";
// import { useCartContext } from "../hooks";
// import { formatCurrency } from "../utils/helpers";
// import Modal from "./Modal";
// import { useState } from "react";

// interface ShippingOptionModalProps {
//   isOpen: boolean;
//   handleClose: () => void;
// }

// export default function ShippingOptionModal({ isOpen, handleClose }: ShippingOptionModalProps) {
//   const { shippingOptions, selectedShippingOption,  } = useCartContext();

//   return (
//     <Modal isOpen={isOpen} handleClose={handleClose}>
//       <Modal.Title>Alterar entrega</Modal.Title>
//       {shippingOptions.map((option) => (
//         <Box key={option.id}>
//           <input
//             type="radio"
//             name="address"
//             key={option.id}
//             value={option.id}
//             onChange={() => setSelectedShippingOption(option.id)}
//             checked={selectedShippingOption === option.id}
//           />
//           <p>{option.name}</p>
//           <p>{formatCurrency(parseFloat(option.price))}</p>
//           <p>{option.deliveryTime}</p>
//         </Box>
//       ))}
//     </Modal>
//   );
// }

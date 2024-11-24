import { useAddressContext } from "../../hooks";
import { IShippingOption } from "../../interfaces";
import Modal from "../Modal";
import ShippingOption from "../ShippingOption";

interface ShippingOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: IShippingOption[];
}

export default function ShippingOptionsModal({
  isOpen,
  onClose,
  data,
}: ShippingOptionsModalProps) {
  const { shippingOptions } = useAddressContext();

  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <Modal.Title>Opções de entrega</Modal.Title>
      {data
        ? data.map((option) => (
            <ShippingOption optionData={option} key={option.id} />
          ))
        : shippingOptions.map((option) => (
            <ShippingOption optionData={option} key={option.id} />
          ))}
    </Modal>
  );
}

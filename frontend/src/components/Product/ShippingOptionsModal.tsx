import { useAddressContext } from "../../hooks";
import Modal from "../Modal";
import ShippingOption from "../ShippingOption";

interface ShippingOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShippingOptionsModal({
  isOpen,
  onClose,
}: ShippingOptionsModalProps) {
  const { shippingOptions } = useAddressContext();

  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <Modal.Title>Opções de entrega</Modal.Title>
      {shippingOptions.map((option) => (
        <ShippingOption optionData={option} key={option.id} />
      ))}
    </Modal>
  );
}

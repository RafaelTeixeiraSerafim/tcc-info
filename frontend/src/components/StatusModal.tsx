import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IOrder } from "../interfaces";
import { fetchStatusList, updateOrder } from "../service/api";
import Form from "./Form";
import Modal from "./Modal";
import OrderStatusStepper from "./OrderStatusStepper";

interface StatusModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: IOrder;
  setOrder: React.Dispatch<React.SetStateAction<IOrder | null>>;
}

export default function StatusModal({
  isOpen,
  setIsOpen,
  order,
  setOrder,
}: StatusModalProps) {
  const [statusList, setStatusList] = useState<IOrder["status"][]>([]);
  const [selectedStatus, setSelectedStatus] = useState<IOrder["status"]>(
    order.status
  );

  const handleClose = () => setIsOpen(false);

  const getStatusList = async () => {
    try {
      const statusList = await fetchStatusList();
      setStatusList(
        statusList.filter((status: string) => status !== "IN_PROGRESS")
      );
    } catch (error) {
      alert(`Erro ao pegar os status: ${(error as AxiosError).message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateOrder(order.id, selectedStatus);
      setOrder({
        ...order,
        status: selectedStatus,
      });
      handleClose();
    } catch (error) {
      alert(`Erro ao alterar o pedido: ${(error as AxiosError).message}`);
    }
  };

  useEffect(() => {
    getStatusList();
  }, []);

  return (
    <Modal
      handleClose={handleClose}
      isOpen={isOpen}
      style={{
        width: "50%",
        minHeight: "70vh",
        gap: "5rem",
      }}
    >
      <Modal.Title>Alterar Status</Modal.Title>
      <Form
        onSubmit={handleSubmit}
        style={{ flex: 1, justifyContent: "space-between", width: "100%" }}
      >
        <OrderStatusStepper
          value={order.status}
          statusList={statusList}
          onChange={(value) => setSelectedStatus(value)}
        />
        <Form.Actions>
          <Modal.CancelButton />
          <Form.SubmitButton>Alterar</Form.SubmitButton>
        </Form.Actions>
      </Form>
    </Modal>
  );
}

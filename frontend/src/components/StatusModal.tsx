import { useEffect, useState } from "react";
import { IOrder } from "../interfaces";
import Modal from "./Modal";
import { InputLabel } from "@mui/material";
import Form from "./Form";
import StatusSelect from "./StatusSelect";
import { fetchStatusList, updateOrder } from "../service/api";
import { AxiosError } from "axios";

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
  const [statusList, setStatusList] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>(order.status);

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
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <Modal.Title>Alterar Inputs</Modal.Title>
      <Form handleSubmit={handleSubmit}>
        <StatusSelect
          selectedStatus={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          statusList={statusList}
        />
        <Form.Actions>
          <Modal.CancelButton />
          <Form.SubmitButton>Alterar</Form.SubmitButton>
        </Form.Actions>
      </Form>
    </Modal>
  );
}

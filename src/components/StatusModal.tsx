import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IOrder } from "../interfaces";
import FormModal from "./FormModal";
import StatusInputs from "./StatusInputs";

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
  const [statusList, setStatusList] = useState<string[] | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>(order.status);
  const handleClose = () => setIsOpen(false);

  const getStatusList = () => {
    axiosInstance
      .get("/api/v1/orders/status")
      .then((response) => {
        console.log(response);
        setStatusList(
          response.data.filter((status: string) => status !== "IN_PROGRESS")
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .patch(`/api/v1/orders/${order.id}`, {
        status: selectedStatus,
      })
      .then((response) => {
        console.log(response);
        setOrder({
          ...order,
          status: selectedStatus,
        });
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    getStatusList();
  }, []);

  return (
    <FormModal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <StatusInputs
        selectedStatus={selectedStatus}
        setIsOpen={setIsOpen}
        setSelectedStatus={setSelectedStatus}
        statusList={statusList}
      />
    </FormModal>
  );
}

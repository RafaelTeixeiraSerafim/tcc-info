import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IOrder } from "../interfaces";
import Modal from "./Modal";
import { InputLabel, MenuItem, Select } from "@mui/material";
import SubmitButton from "./SubmitButton";
import translateStatus from "../utils/funcs/statusTranslator";

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
      <Modal handleClose={handleClose} isOpen={isOpen}>
      <Modal.Title>Alterar Inputs</Modal.Title>
        <Modal.Form handleSubmit={handleSubmit}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            label="status"
            id="status-select"
            value={selectedStatus}
            placeholder="Status"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusList?.map((status) => (
              <MenuItem value={status}>{translateStatus(status)}</MenuItem>
            ))}
          </Select>
          <Modal.Actions>
            <Modal.Cancel />
            <SubmitButton>Alterar</SubmitButton>
          </Modal.Actions>
        </Modal.Form>
      </Modal>
  );
}

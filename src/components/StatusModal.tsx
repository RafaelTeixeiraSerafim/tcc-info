import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { IOrder } from "../interfaces";
import UserContext from "../contexts/UserContext";

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
  const { translateStatus } = useContext(UserContext);

  const getStatusList = () => {
    axiosInstance
      .get("api/v1/orders/status")
      .then((response) => {
        console.log(response);
        setStatusList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .patch(`api/v1/orders/${order.id}`, {
        status: selectedStatus,
      })
      .then((response) => {
        console.log(response);
        setOrder({
          ...order,
          status: selectedStatus,
        });
        setIsOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    getStatusList();
  }, []);

  return (
    <Box>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component={"form"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" component="h1">
            Alterar Status
          </Typography>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "inherit",
              width: "100%",
            }}
          >
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
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  flex: 1,
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  flex: 1,
                }}
              >
                Alterar
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
}

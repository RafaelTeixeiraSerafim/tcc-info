import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

interface StatusInputsProps {
  setIsOpen: (state: boolean) => void;
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  statusList: string[] | null;
}

export default function StatusInputs({ setIsOpen, selectedStatus, setSelectedStatus, statusList }: StatusInputsProps) {
  const { translateStatus } = useContext(UserContext);


  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsOpen(false);
  };
  
  return (
    <>
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
    </>
  );
}

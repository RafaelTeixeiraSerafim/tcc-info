import { translateStatus } from "../utils/helpers";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface StatusSelectProps {
  selectedStatus: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  statusList: string[];
}

export default function StatusSelect({
  selectedStatus,
  onChange,
  statusList,
}: StatusSelectProps) {
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="status-select-label">Status</InputLabel>
      <Select
        labelId="status-select-label"
        label="status"
        id="status-select"
        value={selectedStatus}
        placeholder="Status"
        onChange={onChange}
      >
        {statusList?.map((status) => (
          <MenuItem value={status}>{translateStatus(status)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

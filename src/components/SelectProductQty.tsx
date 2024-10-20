import { InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface SelectProductQtyProps {
  qty: number;
  onChange: (e: SelectChangeEvent<number>) => void;
  stockQty: number
}

export default function SelectProductQty({qty, onChange, stockQty}: SelectProductQtyProps) {
  return (
    <>
      <InputLabel id="qty-select-label">Qtde</InputLabel>
      <Select
        labelId="qty-select-label"
        label="Qtde"
        sx={{
          display: "inline",
        }}
        onChange={onChange}
        value={qty}
      >
        {Array.from(
          { length: stockQty },
          (_, i) => i + 1
        ).map((qty) => (
          <MenuItem value={qty} key={qty}>
            {qty}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

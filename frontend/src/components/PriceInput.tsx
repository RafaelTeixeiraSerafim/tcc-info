import { InputAdornment, TextFieldProps } from "@mui/material";
import DecimalInput from "./DecimalInput";

type PriceInputProps = TextFieldProps;

export default function PriceInput({ ...props }: PriceInputProps) {
  return (
    <DecimalInput
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        },
      }}
      {...props}
    />
  );
}
